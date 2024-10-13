class CreateLookup {
    constructor(Lookups) {
        
      this["@odata.type"] = "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata";
      this.SchemaName=Lookups.RelationshipSchemaName;
      this.ReferencedEntity=Lookups.ReferencedEntity;
      this.ReferencingEntity = Lookups.ReferencingEntity;
      this.ReferencedAttribute=Lookups.ReferencedAttribute;
      this.CascadeConfiguration=this.Cascade();
      this.Lookup= this.createLookup(Lookups.AttributeSchemaName,Lookups.AttributeDisplayName);
      this.RequiredLevel=this.Required(Lookups.RequiredLevel);
    }
    Cascade() {
        return {
            "Assign": "Cascade",
            "Delete": "Cascade"
        };
    }
    
    createLookup(label,label2) {
        return {
            "SchemaName": label,
            "DisplayName": {
                "LocalizedLabels": [
                    {
                        "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
                        "Label": label2,
                        "LanguageCode": 1033 
                    }
                ]
            }
        };
    }
    Required(value){
        return{
             "Value": value,
        };
    }
    
}

module.exports =  CreateLookup 
 