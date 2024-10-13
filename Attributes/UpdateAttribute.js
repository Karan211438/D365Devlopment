class UpdateAttribute {
    constructor(Attributes) {
        const entityName = Attributes.entityName; 
        const attributeType = Attributes.Datatype; 
        const attributename=Attributes.AttributeName;
        this["@odata.context"] = `https://ogre-dev.crm11.dynamics.com/api/data/v9.0/$metadata#EntityDefinitions'(${entityName})'/Attributes/Microsoft.Dynamics.CRM.(${attributeType})AttributeMetadata/$entity`;
        this["@odata.type"] = `#Microsoft.Dynamics.CRM.'${attributeType}'AttributeMetadata`;
        if(attributeType==="Picklist"){
         this.FormulaDefinition = "";
         this.SourceTypeMask=0;
         this.ParentPicklistLogicalName=null;
         this.ChildPicklistLogicalNames=[];
         this.DefaultFormValue=null;
         this.AttributeOf=null;
         this.AttributeType=attributeType;
         this.ColumnNumber=Attributes.ColumnNumber;
         this. DeprecatedVersion=null;
         this.IntroducedVersion="1.0";
         this.EntityLogicalName=entityName;
         this.IsCustomAttribute=true;
         this.IsPrimaryId=false;
         this.IsValidODataAttribute=true;
         this.IsPrimaryName=false;
         this.IsValidForCreate=true;
         this.IsValidForRead=true;
         this.IsValidForUpdate=true;
         this.CanBeSecuredForRead=true;
         this.CanBeSecuredForCreate=true;
         this.CanBeSecuredForUpdate=true;
         this.IsSecured=false;
         this.IsRetrievable=false;
         this.IsFilterable=false;
         this.IsManaged=false;
         this.LinkedAttributeId=null;
         this.LogicalName=attributename;
         this.IsValidForForm=true;
         this.IsRequiredForForm=false;
         this.IsValidForGrid=true;
         this.SchemaName=attributename;
         this.ExternalName=null;
         this.IsLogical=false;
         this.IsDataSourceSecret=false;
         this.InheritsFrom=null;
         this.CreatedOn= Attributes.CreatedOn;
         thus

        }
        // this.DisplayName = this.createLabel(entity.DisplayName);
        // this.DisplayCollectionName = this.createLabel(entity.DisplayCollectionName);
        // this.Description = this.createLabel(entity.Description);
        // this.OwnershipType = entity.OwnershipType; 
        // this.IsActivity = entity.IsActivity; 
        // this.HasNotes = entity.HasNotes;
        // this.HasActivities = entity.HasActivities; 
        // this.Attributes = this.createAttributes(entity.Attributes); 
    }

    // createLabel(label) {
    //     return {
    //         "@odata.type": "Microsoft.Dynamics.CRM.Label",
    //         "LocalizedLabels": [
    //             {
    //                 "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
    //                 "Label": label,
    //                 "LanguageCode": 1033 
    //             }
    //         ]
    //     };
    // }

    // createAttributes(fields) {
    //     if (!Array.isArray(fields)) {
    //         return []; 
    //     }
    //     return fields.map(field => this.createAttribute(field));
    // }

    // createAttribute(field) {
    //     const attribute = {
    //         "@odata.type": `Microsoft.Dynamics.CRM.${this.getAttributeType(field.Type)}`,
    //         "SchemaName": field.SchemaName,
    //         "DisplayName": this.createLabel(field.DisplayName),
    //         "Description": this.createLabel(field.Description),
    //         "IsPrimaryName": field.IsPrimary || false,
    //         "RequiredLevel": {
    //             "Value": field.Required,
    //             "CanBeChanged": true, 
    //             "ManagedPropertyLogicalName": "canmodifyrequirementlevelsettings" 
    //         }
    //     };
    //     switch (field.Type.toLowerCase()) {
    //         case "string":
    //             attribute.MaxLength = field.MaxLength || 100;
    //             attribute.Format = field.Format || "Text";
    //             break;
    //         case "integer":
    //             break;
    //         case "datetime":
    //             attribute.Format = field.Format || "DateOnly";
    //             break;
    //         case "picklist":
    //             attribute.OptionSet = {
    //                 "Options": field.Options.map(option => ({
    //                     "Value": option.Value,
    //                     "Label": this.createLabel(option.Label)
    //                 })),            
    //                 "IsGlobal": false,
    //                 "OptionSetType": "Picklist"

    //             };
    //             break;
    //         case "multiselectpicklist":
    //             attribute.OptionSet = {
    //                 "Options": field.Options.map(option => ({
    //                     "Value": option.Value,
    //                     "Label": this.createLabel(option.Label)
    //                 }))
    //             };
    //             break;
    //         case "boolean":
    //             attribute.DefaultValue = field.DefaultValue || false;
    //             attribute.OptionSet = {
    //                 "TrueOption": {
    //                     "Value": field.Options.True.Value,
    //                     "Label": this.createLabel(field.Options.True.Label)
    //                 },
    //                 "FalseOption": {
    //                     "Value": field.Options.False.Value,
    //                     "Label": this.createLabel(field.Options.False.Label)
    //                 }
    //             };
    //             break;
    //         case "money":
    //             break;
    //         case "decimal":
    //             attribute.Precision = field.Precision || 2;
    //             break;
    //         case "lookup":
    //             attribute.Targets = field.Targets;
    //             break;
    //         case "image":
    //             break;
    //         case "memo":
    //             attribute.MaxLength = field.MaxLength || 2000;
    //             break;
    //         default:
    //            attribute.MaxLength = field.MaxLength || 100;
    //            break; 
    //     }

    //     return attribute;
    // }

    // getAttributeType(dataType) {
    //     switch (dataType.toLowerCase()) {
    //         case "string": return "StringAttributeMetadata";
    //         case "integer": return "IntegerAttributeMetadata";
    //         case "float": return "DoubleAttributeMetadata";
    //         case "decimal": return "DecimalAttributeMetadata";
    //         case "money": return "MoneyAttributeMetadata";
    //         case "date": return "DateTimeAttributeMetadata";
    //         case "datetime": return "DateTimeAttributeMetadata";
    //         case "boolean": return "BooleanAttributeMetadata";
    //         case "picklist": return "PicklistAttributeMetadata";
    //         case "multiselectpicklist": return "MultiSelectPicklistAttributeMetadata";
    //         case "lookup": return "LookupAttributeMetadata";
    //         case "customer": return "CustomerAttributeMetadata";
    //         case "guid": return "UniqueIdentifierAttributeMetadata";
    //         case "memo": return "MemoAttributeMetadata";
    //         case "image": return "ImageAttributeMetadata";
    //         case "file": return "FileAttributeMetadata";
    //         default: return "StringAttributeMetadata"; 
    //     }
    // }
}

module.exports =  UpdateAttribute 
    