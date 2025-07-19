import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";  // npm i uuid
import { projects } from "../lib/projectStore";
import { Project, Task } from "@/types/project";

// List all projects
export async function GET() {
  return NextResponse.json({ projects });
}

// Create a new project
export async function POST(req: NextRequest) {
  const { title, description } = await req.json();
  const project: Project = {
    id: uuidv4(),
    title,
    description,
    tasks: [],
  };
  projects.push(project);
  return NextResponse.json({ project });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();

  //  Update PROJECT
  if (data.type === "project") {
    const { id, title, description } = data;
    const project = projects.find(p => p.id === id);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    project.title = title ?? project.title;
    project.description = description ?? project.description;
    return NextResponse.json({ project });
  }

  // ADD TASK
  if (data.type === "task" && data.projectId) {
    const { projectId, title, status } = data;
    const project = projects.find(p => p.id === projectId);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    const task: Task = {
      id: uuidv4(),
      title,
      status: status ?? "pending",
      projectId: projectId
    };
    project.tasks.push(task);
    return NextResponse.json({ task, project });
  }

  // UPDATE TASK 
  if (data.type === "update-task" && data.projectId && data.taskId) {
    const { projectId, taskId, title, status } = data;
    const project = projects.find(p => p.id === projectId);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    const task = project.tasks.find(t => t.id === taskId);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    if (title) task.title = title;
    if (status) task.status = status;
    return NextResponse.json({ task, project });
  }

  return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
}
