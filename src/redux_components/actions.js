export const onSerfing = (payload) => ({type:'OnSerfing', payload});
export const onGoToPrev = () => ({type:'onGoToPrev'});
export const onGoToHome = () => ({type:'onGoToHome'});
export const openCreateFolderForm = () => ({type:'openCreateFolderForm'});
export const closeAllModalWindow = () => ({type:'closeAllModalWindow'});
export const createNewFolder = (payload) => ({type:'createNewFolder',payload});
export const openCreateNewTaskForm = () => ({type:'openCreateNewTaskForm'});
export const CreateNewTask = (payload) => ({type:'CreateNewTask',payload});
export const setTasks = (payload) => ({type:'setTasks',payload});
export const setFileSystemItems = (payload) => ({type:'setFileSystemItems',payload});
export const setStore = (payload) => ({type:'setStore',payload});
export const startTask = (payload) => ({type:'startTask',payload});
export const increaseTemporaryIdForTask = () => ({type:'increaseTemporaryIdForTask'});
export const changeStatusAndSetIdForTaskByTemporaryId = (payload) => ({type:'changeStatusAndSetIdForTaskByTemporaryId',payload});
export const setOngoingTasks = (payload) => ({type:'setOngoingTasks',payload});
export const setTimeTask = (payload) => ({type:'setTimeTask',payload});
export const setSwitchableOngoingTask = (payload) => ({type:'setSwitchableOngoingTask',payload});
export const setDateRange = (payload) => ({type:'setDateRange',payload});
export const setDateRangeStartDate = (payload) => ({type:'setDateRangeStartDate',payload});
export const setDateRangeEndDate = (payload) => ({type:'setDateRangeEndDate',payload});
export const setStatChartsTaskArr = (payload) => ({type:'setStatChartsTaskArr',payload});
export const pushOrRemIdForStatChartTaskArr = (payload) => ({type:'pushOrRemIdForStatChartTaskArr',payload});
export const openRenameFolderForm = () => ({type:'openRenameFolderForm'});
export const setFolderNotAvailable = (folderId) => ({type:'setFolderNotAvailable',payload:folderId});
export const setFolderAvailable = (folderId) => ({type:'setFolderAvailable',payload:folderId});
export const setReplaceFolderId = (folderId) => ({type:'setReplaceFolderId',payload: folderId});


