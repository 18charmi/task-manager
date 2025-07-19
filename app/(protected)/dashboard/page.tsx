"use client"
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Project } from '@/types/project';
import { useProjectStore } from '@/store/slice/project';
import { ProjectList } from './components/ProjectList';
import CustomDialog from '@/components/CustomDialog';
import ContentForm from './components/ContentForm';
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<undefined | Project>();

  const fetchProjects = useProjectStore(s => s.fetchProjects);
  const projects = useProjectStore(s => s.projects);

  useEffect(() => {
    fetchProjects()
  }, []);


  const handleDialogOpen = (project?: Project) => {
    setActiveProject(project)
    setOpen(true)
  };
  const handleDialogClose = () => {
    setActiveProject(undefined);
    setOpen(false)
  };

  return <div className="max-w-2xl mx-auto px-4 py-8">

    <Header addProject={() => handleDialogOpen()} />

    <ProjectList list={projects} onEdit={(p) => handleDialogOpen(p)} />
    <CustomDialog
      open={open}
      title={`${activeProject ? "Update" : "Add"} Project Details`}
      onClose={handleDialogClose}
    >
      <ContentForm detail={activeProject} onClose={() => handleDialogClose()} />
    </CustomDialog>

  </div>
};

export default Dashboard;
