import fullGrader from "@/assets/projects/grading-gui.png"
import fileStructure from "@/assets/projects/grading-gui/file-structure.png"
import gradingProject from "@/assets/projects/grading-gui/grading-project.png"
import loadProject from "@/assets/projects/grading-gui/load-project.png"
import runProject from "@/assets/projects/grading-gui/run-project.png"

export const gradingGuiDetails = {
  overview:
    "I built the Digital Design Grading GUI to make it easier for teaching assistants to grade digital logic assignments. The Python desktop app uses Tkinter to give TAs one place to organize submissions, run ModelSim testbenches, and review saved simulation results.",
  workflow:
    "TAs created a grading project by adding a Canvas submissions ZIP, a student list, a Tcl script, and the lab’s testbenches. After loading the project, they could run the tests for one student at a time or in a batch. The app saved the latest result for each student so TAs could reopen it later.",
  scriptAuthor: {
    name: "Keeth Smith",
    githubUrl: "https://github.com/KeethSmith",
  },
  screenshots: [
    {
      src: fullGrader,
      caption: "Grading interface",
      alt: "The full grading window, with file copy and project setup on the left and project selection, simulation results, and run controls on the right.",
    },
    {
      src: gradingProject,
      caption: "Create a grading project",
      alt: "The setup form shows a selected Tcl script, student list, submissions ZIP, and three testbenches. A confirmation indicates that the project was created.",
    },
    {
      src: loadProject,
      caption: "Load a grading project",
      alt: "Project and student menus sit next to buttons for loading a project and viewing the current, previous, or next student's saved result.",
    },
    {
      src: runProject,
      caption: "Run a grading project",
      alt: "A completed simulation log appears above the Run, Run Next, and Run All buttons for testing individual submissions or a batch.",
    },
    {
      src: fileStructure,
      caption: "Grading project files",
      alt: "Windows File Explorer shows separate folders for ModelSim files, saved results, student submissions, and Tcl scripts.",
    },
  ],
}
