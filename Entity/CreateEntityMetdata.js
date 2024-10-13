class CreateEntityMetdata {
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
        this.Attributes = this.createAttributes(entity.Attributes); 
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

    createAttributes(fields) {
        if (!Array.isArray(fields)) {
            return []; 
        }
        return fields.map(field => this.createAttribute(field));
    }

    createAttribute(field) {
        const attribute = {
            "@odata.type": `Microsoft.Dynamics.CRM.${this.getAttributeType(field.Type)}`,
            "SchemaName": field.SchemaName,
            "DisplayName": this.createLabel(field.DisplayName),
            "Description": this.createLabel(field.Description),
            "IsPrimaryName": field.IsPrimary || false,
            "RequiredLevel": {
                "Value": field.Required,
                "CanBeChanged": true, 
                "ManagedPropertyLogicalName": "canmodifyrequirementlevelsettings" 
            }
        };
        switch (field.Type.toLowerCase()) {
            case "string":
                attribute.MaxLength = field.MaxLength || 100;
                attribute.Format = field.Format || "Text";
                break;
            case "datetime":
                attribute.Format = field.Format || "DateOnly";
                break;
                case "picklist":
                    if (!field.IsGlobal) {
                        attribute.OptionSet = {
                            "Options": field.Options.map(option => ({
                                "Value": option.Value,
                                "Label": this.createLabel(option.Label)
                            })),
                            "IsGlobal": field.IsGlobal,
                            "OptionSetType": "Picklist"
                        };
                    } else {
                        attribute["GlobalOptionSet@odata.bind"]="/GlobalOptionSetDefinitions("+field.MetadataId+")"
                    }
                   break;
                case "boolean":
                attribute.DefaultValue = field.DefaultValue || false;
                attribute.OptionSet = {
                    "TrueOption": {
                        "Value": field.Options.True.Value,
                        "Label": this.createLabel(field.Options.True.Label)
                    },
                    "FalseOption": {
                        "Value": field.Options.False.Value,
                        "Label": this.createLabel(field.Options.False.Label)
                    }
                };
                break;
                case "multiselectpicklist":
                    if (!field.IsGlobal) {
                        attribute.OptionSet = {
                            "Options": field.Options.map(option => ({
                                "Value": option.Value,
                                "Label": this.createLabel(option.Label)
                            })),
                            "IsGlobal": field.IsGlobal,
                            "OptionSetType": "Picklist"
                        };
                    } else {
                        attribute["GlobalOptionSet@odata.bind"]="/GlobalOptionSetDefinitions("+field.MetadataId+")"
                    }
                   break;
            case "money":
                attribute.MinValue=field.MinValue||0;
                attribute.Precision=field.Precision||2;
                attribute.MaxValue=field.MaxValue||10000000;
                break;
            case "integer":
                if(field.Format==="Duration"){
                attribute.Format=field.Format
                }
                break;
            case "decimal":
                attribute.MinValue=field.MinValue||0;
                attribute.Precision=field.Precision||2;
                attribute.MaxValue=field.MaxValue||10000000;
                break;
            case "lookup":
                attribute.Targets = field.Targets;
                break;
            case "image":
                break;
            case "memo":
                attribute.MaxLength = field.MaxLength || 2000;
                break;
            default:
               attribute.MaxLength = field.MaxLength || 100;
               break; 
        }

        return attribute;
    }

    getAttributeType(dataType) {
        switch (dataType.toLowerCase()) {
            case "string": return "StringAttributeMetadata";
            case "integer": return "IntegerAttributeMetadata";
            case "float": return "DoubleAttributeMetadata";
            case "decimal": return "DecimalAttributeMetadata";
            case "money": return "MoneyAttributeMetadata";
            case "date": return "DateTimeAttributeMetadata";
            case "datetime": return "DateTimeAttributeMetadata";
            case "boolean": return "BooleanAttributeMetadata";
            case "picklist": return "PicklistAttributeMetadata";
            case "multiselectpicklist": return "MultiSelectPicklistAttributeMetadata";
            case "lookup": return "LookupAttributeMetadata";
            case "customer": return "CustomerAttributeMetadata";
            case "guid": return "UniqueIdentifierAttributeMetadata";
            case "memo": return "MemoAttributeMetadata";
            case "image": return "ImageAttributeMetadata";
            case "file": return "FileAttributeMetadata";
            default: return "StringAttributeMetadata"; 
        }
    }
}

module.exports =  CreateEntityMetdata 
    