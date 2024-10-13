class createAttribute {
    constructor(attribute) {
        this["@odata.type"] = "Microsoft.Dynamics.CRM."+ attribute.DataType+ "AttributeMetadata";
        this.SchemaName =  attribute.SchemaName;
        this.DisplayName = this.createLabel(attribute.DisplayName);
        this.Description = this.createLabel(attribute.Description);
        this.IsPrimaryName= attribute.IsPrimary||false;
        this.RequiredLevel = this.Required(attribute.RequiredLevel);
        switch (attribute.DataType.toLowerCase()) {
            case "string":
                this.MaxLength = attribute.MaxLength || 100;
                this.Format = attribute.Format || "Text";
                break;
        
            case "integer":
                if(attribute.Format!=null){
                    this.MinValue=attribute.MinValue||0;
                    this.Format=attribute.Format||2;
                    this.MaxValue=attribute.MaxValue||2147483647;
                }
                break;
            case "datetime":
                this.Format = attribute.Format || "DateOnly";
                break;
            case "picklist":
                this.OptionSet = {
                    "Options": attribute.Options.map(option => ({
                        "Value": option.Value,
                        "Label": this.createLabel(option.Label)
                    })),            
                    "IsGlobal": attribute.IsGlobal,
                    "OptionSetType": "Picklist"

                };
                break;
            case "multiselectpicklist":
                this.OptionSet = {
                    "Options": attribute.Options.map(option => ({
                        "Value": option.Value,
                        "Label": this.createLabel(option.Label)
                    })),
                     "IsGlobal": attribute.IsGlobal,
                    "OptionSetType": "Picklist"
                };
                break;
            case "boolean":
                this.DefaultValue = attribute.DefaultValue || false;
                this.OptionSet = {
                    "TrueOption": {
                        "Value": attribute.Options.True.Value,
                        "Label": this.createLabel(attribute.Options.True.Label)
                    },
                    "FalseOption": {
                        "Value": attribute.Options.False.Value,
                        "Label": this.createLabel(attribute.Options.False.Label)
                    }
                };
                break;
            case "money":
                break;
            case "decimal":
                this.Precision = attribute.Precision || 2;
                break;
            case "lookup":
                this.Targets = attribute.Targets;
                break;
            case "image":
                break;
            case "memo":
                this.MaxLength = attribute.MaxLength || 2000;
                break;
            default:
               this.MaxLength = attribute.MaxLength || 100;
               break; 
        }
        // return attribute;
    }
    Required(value){
        return{
             "Value": value,
             "CanBeChanged": false, 
             "ManagedPropertyLogicalName": "canmodifyrequirementlevelsettings" 
        };
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

module.exports =  createAttribute 
    