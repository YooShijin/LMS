import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";
import next from "next";

interface GetChaptersProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChpater = async ({
  userId,
  courseId,
  chapterId,
}: GetChaptersProps) => {
  try {
    const purchase = await db.purchase.findFirst({
      where: { userId: userId, courseId: courseId },
    });

    const course = await db.course.findUnique({
      where: { id: courseId, isPublished: true },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findFirst({
      where: {
        userId: userId,
        chapterId: chapterId,
      },
    });

    return {
      chapter,
      attachments,
      userProgress,
      course,
      nextChapter,
      purchase,
      muxData,
    };
  } catch (err) {
    console.log("[GET_CHAPTER]", err);
    return {
      chapter: null,
      attachments: null,
      userProgress: null,
      course: null,
      nextChapter: null,
      purchase: null,
      muxData: null,
    };
  }
};
