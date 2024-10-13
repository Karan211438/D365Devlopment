class CreateLookup {
    constructor(Lookups) {
        
      this["@odata.type"] = "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata";
      this.SchemaName=Lookups.RelationshipSchemaName;
      this.ReferencedEntity=Lookups.ReferencedEntity;
      this.ReferencingEntity = Lookups.ReferencingEntity;
      this.ReferencedAttribute=Lookups.ReferencedAttribute;
      this.CascadeConfiguration=this.Cascade();
      this.Lookup= this.createLookup(Lookups.AttributeSchemaName,Lookups.AttributeDisplayName,Lookups.RequiredLevel);
      //this.RequiredLevel=this.Required(Lookups.RequiredLevel);
    }
    Cascade() {
        return {
            "Assign": "Cascade",
            "Delete": "Cascade"
        };
    }
    
    createLookup(label,label2,RequiredLevel) {
        return {
            "SchemaName": label,
            "DisplayName": {
                "LocalizedLabels": [
                    {
                        "Label": label2,
                        "LanguageCode": 1033 
                    }
                ]
            },
            "RequiredLevel": {
              "Value": RequiredLevel
            }
        };
    }
   
    
}

module.exports =  CreateLookup 
 