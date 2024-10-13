class UpdateEntityMetdata {
    constructor(entity) {
        this["@odata.type"] = "Microsoft.Dynamics.CRM.EntityMetadata";
        this.SchemaName = entity.SchemaName;
        this.DisplayName = this.createLabel(entity.DisplayName);
        this.DisplayCollectionName = this.createLabel(entity.DisplayCollectionName);
        this.Description = this.createLabel(entity.Description);
        this.OwnershipType = entity.OwnershipType; 
        this.IsActivity = entity.IsActivity; 
        this.HasNotes = entity.HasNotes;
        this.HasActivities = entity.HasActivities; 
    }

    createLabel(label) {
        return {
            "@odata.type": "Microsoft.Dynamics.CRM.Label",
            "LocalizedLabels": [
                {
                    "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
                    "Label": label,
                    "LanguageCode": 1033 
                }
            ]
        };
    }
    
   
}

module.exports =  UpdateEntityMetdata 
    