class CreateViews {
    constructor(views) {
        // // this["@odata.type"] = "Microsoft.Dynamics.CRM.EntityMetadata";
        // // this.SchemaName = Attribute.SchemaName;
        // // this.DisplayName = this.createLabel(Attribute.DisplayName);
        // // this.DisplayCollectionName = tC
        // // this.Description = this.createLabel(Attribute.Description);
        // // this.OwnershipType = Attribute.OwnershipType; 
        // // this.IsActivity = Attribute.IsActivity; 
        // // this.HasNotes = Attribute.HasNotes;
        // // this.HasActivities = Attribute.HasActivities; 
        // this.AttributeType = Attribute.DataType//
        // this.AttributeTypeName =  this.craeteAttributeType(Attribute.DataType);
        // this.Description = this.createLabel(Attribute.Description);
        // this.DisplayName = this.createLabel(Attribute.DisplayName);
        // this.SchemaName =  Attribute.SchemaName;
        // this["@odata.type"] = "Microsoft.Dynamics.CRM."+ Attribute.DataType.toUpperCase()+ "AttributeMetadata";
        // if (Attribute.DataType.toUpperCase() === "STRING") {
        //     this.FormatName = this.Check(Attribute); // Assuming Check handles max length internally
        //     this.MaxLength = Attribute.MaxLength; // Ensure Attribute.MaxLength exists
        // }
      this["@odata.type"] = "Microsoft.Dynamics.CRM.savedquery";
      this.name = views.NameOftheview;
      this.returnedtypecode=views.EntityLogicalName;
      this.fetchxml=views.fetchxml
      this.layoutxml = views.layoutxml;
      this.description= views.description;
      this.querytype=0;

    }
   
    
   
}

module.exports =  CreateViews 