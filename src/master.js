 const Master = (function(){
 const masterArray = [];
 let currentMasterElement;

 function addToMaster(project){
    masterArray.push(project);
 }

 function removeFromMaster(currentProject){
   let id = masterArray.findIndex((arr) => arr.name === currentProject.name);
   masterArray.splice(id,1);
 }

 function getMaster(){
    return masterArray;
 }

 function setCurrentMasterElement(id){
   currentMasterElement = masterArray[id];
 }

 function getCurrentMasterElement(){
   if(!currentMasterElement){
      return masterArray[0];
   }
   return currentMasterElement;
 }

 function searchForExistingProject(projectName){
   for(const project of getMaster()){
      if(projectName.toLowerCase() == project.name.toLowerCase()){
         return true;
      }
   }
   return false;
 }

 return{
    addToMaster,
    removeFromMaster,
    getMaster,
    setCurrentMasterElement,
    getCurrentMasterElement,
    searchForExistingProject,
 }

})();

export default Master;