import {initialState} from './initialState';


const getFileSistemWithCloseModalWindow = (state)=>{
    return{
        ...state.fileSistem,
        isOpenCreateFolderForm:false,
        isOpenCreateTaskForm: false,
        isOpenRenameFolderForm:false,
        taskOptionsPanel:{
            optionsPanelIsOpenForTask:-1,
        },
    }
}

const isValidNewFolderName = (folder_name) =>{
    return true;
}

const isValidFieldsNewTask = (field_obj)=>{
    return true;
}

const getTaskByTemporaryId = (state,temporaryId) =>{

    return state.tasks.find((item) =>{
        return item.temporaryId == temporaryId
    })
}
const getIndexTaskByTemporaryId = (state,temporaryId) =>{

    return state.tasks.findIndex((item) =>{
        return item.temporaryId == temporaryId
    })
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'OnSerfing':{
            let OldFileSistem = state.fileSistem;
            let id = action.payload;

            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    currentItemId: id,
                }
            }
            return newState;
        }
        case 'onGoToPrev':{
            let prevId = -1;
            state.fileSistem.items.forEach((item)=> {
                if(item.id === state.fileSistem.currentItemId) prevId = item.parentsId
            });

            let OldFileSistem = state.fileSistem;
            let id = prevId;

            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    currentItemId: id,
                }
            }
            return newState;
        }
        case 'onGoToHome':{

            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    currentItemId: state.fileSistem.homeLevelId,
                }
            }
            return newState;
        }
        case 'openCreateFolderForm':{
            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    isOpenCreateFolderForm: true,
                }
            }
            return newState;
        }
        case 'closeAllModalWindow':{
            let newState = {
                ...state,
                fileSistem: getFileSistemWithCloseModalWindow(state)
            }
            return newState;
        }
        case 'createNewFolder':{
            const newFolderName = action.payload;
            if(isValidNewFolderName(newFolderName)){
                const newtFolderId = state.fileSistem.items[state.fileSistem.items.length - 1].id + 1;
                
                const newItem = {
                    id:newtFolderId,
                    name:newFolderName,
                    children: [],
                    parentsId:state.fileSistem.currentItemId,
                    tasks:[],
                };
                let newState = {
                    ...state,
                    fileSistem: {
                        ...state.fileSistem,
                        isOpenCreateFolderForm:false,
                        items:[
                            ...state.fileSistem.items,
                            newItem
                        ]
                    }
                }
                return newState;
            }
            return state;
        }
        case 'openCreateNewTaskForm':{
            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    isOpenCreateTaskForm: true,
                }
            }
            return newState;
        }
        case 'CreateNewTask':{
            const ObjFormVal = action.payload.getObjFormVal;
            if(isValidFieldsNewTask){
                const temporaryId = action.payload.temporaryId;
                const newTask = {
                    temporaryId:temporaryId,
                    status: 'creating',
                    name: ObjFormVal.name,
                    description: ObjFormVal.description,
                    stages:ObjFormVal.stages,
                    folderId: state.fileSistem.currentItemId,
                    stageLastId: ObjFormVal.stageItemIdx
                };
                let newState = {
                    ...state,
                    tasks: [
                        ...state.tasks,
                        newTask
                    ],
                    fileSistem:{
                        ...state.fileSistem,
                        isOpenCreateTaskForm: false,
                    }
                }
                return newState;
            }
            return state;
        }
        case 'changeStatusAndSetIdForTaskByTemporaryId':{
            const {temporaryId, status, id} = action.payload;
            const tasksArr = [...state.tasks];
            let taskIdx = getIndexTaskByTemporaryId(state, temporaryId);
            let task = state.tasks[taskIdx];
            delete task.temporaryId;
            task.id = id;
            task.status = status;
            tasksArr.splice(taskIdx ,1);


            let newState = {
                ...state,
                tasks: [
                    ...tasksArr,
                    task
                ],
            }
            console.log(newState);
            return newState;
        }
        case 'setTasks':{
            const newState = {
                ...state,
                tasks:action.payload
            }
            return newState;

        }
        case 'setFileSystemItems':{
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    items: action.payload
                }
            }
            return newState;

        }
        case 'setStore':{
            let tasks;
            let fileSystemItems;
            let ongoingTasksArr;
            if(action.payload.tasks) tasks = JSON.parse(action.payload.tasks);
            else  tasks = [];
            if(action.payload.fileSystem) fileSystemItems = JSON.parse(action.payload.fileSystem);
            else fileSystemItems = [];
            if(action.payload.activeTask) ongoingTasksArr = action.payload.activeTask;
            else ongoingTasksArr = [];
            const newState = {
                ...state,
                tasks,
                fileSistem:{
                    ...state.fileSistem,
                    items: fileSystemItems
                },
                ongoingTasksArr
            }
            return newState;

        }
        case 'startTask':{
            const newState = {
                ...state,
                ongoingTasksArr: [
                    ...state.ongoingTasksArr,
                    {
                        id: action.payload,
                        status: 'connecting',
                        ongoingTime: 0
                    }
                ]
            }
            return newState;
        }
        case 'increaseTemporaryIdForTask': {
            const newState = {
                ...state,
                other_inf:{
                    ...state.other_inf,
                    newTemporaryIdForNewTask: state.other_inf.newTemporaryIdForNewTask + 1,
                }
            }
            return newState;
        }
        case 'setOngoingTasks':{
            const newState = {
                ...state,
                ongoingTasksArr:[
                    ...action.payload
                ]
            }
            return newState;

        }
        case 'setTimeTask':{
            const newState = {
                ...state,
                timeTaskArr:action.payload
            }
            return newState;
        }
        case 'setSwitchableOngoingTask':{
            const newState = {
                ...state,
                other_inf:{
                    ...state.other_inf,
                    switchableTaskId:action.payload,
                }
            }
            return newState;
        }
        case 'setDateRange':{
                const newState = {
                    ...state,
                    statistic:{
                        ...state.statistic,
                        dateRange:action.payload

                    }
                }
                return newState;
        }
        case 'setDateRangeStartDate':{
                const newState = {
                    ...state,
                    statistic:{
                        ...state.statistic,
                        dateRange:{
                            ...state.statistic.dateRange,
                            startDate:action.payload
                        }

                    }
                }
                return newState;
        }
        case 'setDateRangeEndDate':{
                const newState = {
                    ...state,
                    statistic:{
                        ...state.statistic,
                        dateRange:{
                            ...state.statistic.dateRange,
                            endDate:action.payload
                        }

                    }
                }
                return newState;
        }
        case 'setStatChartsTaskArr':{
                const newState = {
                    ...state,
                    statistic:{
                        ...state.statistic,
                        charts:{
                            ...state.statistic.charts,
                            tasksArr:action.payload
                        }

                    }
                }
                return newState;
        }
        case 'pushOrRemIdForStatChartTaskArr':{
                const newIdChartTask = action.payload;
                const chartTaskArr = state.statistic.charts.tasksArr;
                const idxNewId = chartTaskArr.indexOf(newIdChartTask);

                if(idxNewId !== -1){
                    const newState = {
                        ...state,
                        statistic:{
                            ...state.statistic,
                            charts:{
                                ...state.statistic.charts,
                                tasksArr:[...chartTaskArr.slice(0,idxNewId),...chartTaskArr.slice(idxNewId+1)],
                            }

                        }
                    }
                    return newState;
                }else{
                    const newState = {
                        ...state,
                        statistic:{
                            ...state.statistic,
                            charts:{
                                ...state.statistic.charts,
                                tasksArr:[...chartTaskArr,newIdChartTask],
                            }

                        }
                    }
                    return newState;
                }
                return state;
        }
        case 'openRenameFolderForm':{
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    isOpenRenameFolderForm:true,
                }
            }
            return newState;
        }
        case 'setFolderNotAvailable':{
            const folderId = action.payload;
            const newFileSysItems = state.fileSistem.items.map((item) => Object.assign({}, item));
            newFileSysItems.forEach((item) => {
               if(item.id === folderId)item['isNotAvailable'] = true;
            });
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    items:[
                        ...newFileSysItems,

                    ]
                }
            }
            return newState;
        }
        case 'setFolderAvailable':{
            const folderId = action.payload;
            const newFileSysItems = state.fileSistem.items.map((item) => Object.assign({}, item));
            newFileSysItems.forEach((item) => {
               if(item.id === folderId)item['isNotAvailable'] = false;
            });
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    items:[
                        ...newFileSysItems,

                    ]
                }
            }
            return newState;
        }
        case 'setReplaceFolderId':{
            // default: -1;
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    replaceFolderId:action.payload,
                }
            }
            return newState;
        }
        case 'openFiSyOptionsPanel':{
            // default: -1;
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    taskOptionsPanel:{
                        ...state.fileSistem.taskOptionsPanel,
                        optionsPanelIsOpenForTask:action.payload,

                    }
                }
            }
            return newState;
        }
        default:
            return state;
    }
}

export default reducer;