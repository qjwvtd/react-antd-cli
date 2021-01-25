import React from 'react';
import { getProject } from '@/common/api/project';
const initState = {
    name: 'dsfadsfadsa',
    address: 'dsfadsafdsa'
};
export default function useProject() {
    const [project, setProject] = React.useState(initState);
    const initProject = function () {
        getProject().then((result) => {
            setProject(result);
        });
    };
    const updateProjectAddres = function (text) {
        project.address = text;
        setProject(project);
    };
    return { project, initProject, updateProjectAddres };
}
