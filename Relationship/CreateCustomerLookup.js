class CreateCustomerLookup {
    constructor(Look) {
        
      this.Lookup = this.createLookup(Look.AttributeSchemaName,Look.AttributeDisplayName,Look.AttributeDescription )
      this.OneToManyRelationships= this.createRelations(Look.Relationship);
    }
    
    createLookup(Value1, Value2,value3) {
        return {
             
                "SchemaName": Value1,
                "DisplayName": {
                    "LocalizedLabels": [
                        {
                            "Label": Value2,  
                            "LanguageCode": 1033
                        }
                    ]
                },
                "Description": {
                    "LocalizedLabels": [
                        {
                            "Label": value3,  
                            "LanguageCode": 1033
                        }
                    ]
                }
            
        };
    }
    createRelations(relationsData) {
        return relationsData.map(item => ({
            "SchemaName": item.SchemaName,
            "ReferencedEntity": item.ReferencedEntity,
            "ReferencingEntity": item.ReferencingEntity
        }));
    }
    
   
    
}

module.exports =  CreateCustomerLookup 
 