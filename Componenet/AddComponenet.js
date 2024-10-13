class AddComponenet {
    constructor(componenet) {
        
     this.ComponentType = (componenet.ComponentType === "Entity" || componenet.ComponentType === "table") ? 1 : (componenet.ComponentType === "Field" || componenet.ComponentType === "Attribute"|| componenet.ComponentType === "Coloum") ? 2 :(componenet.ComponentType === "View") ? 26:(componenet.ComponentType === "Form") ? 24:(componenet.ComponentType === "Option Set ") ? 9:null
     this.ComponentId=componenet.ComponentId;
     this.SolutionUniqueName=componenet.SolutionUniqueName;
     this.AddRequiredComponents=componenet.AddRequiredComponents;
     this.DoNotIncludeSubcomponents=componenet.DoNotIncludeSubcomponents;
     this.IncludedComponentSettingsValues=componenet.IncludedComponentSettingsValues;

    }
   
    
   
}

module.exports =  AddComponenet 