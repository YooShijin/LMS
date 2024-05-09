import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./course-sidebar";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";

interface CourseMobileSideBarProps {
  course: Course & {
    chpaters: (Chapter & { userProgress: UserProgress[] | null })[];
  };
  progressCount: number;
}

const CourseMobileSideBar = ({
  course,
  progressCount,
}: CourseMobileSideBarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72 ">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSideBar;
