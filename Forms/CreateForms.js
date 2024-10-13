class CreateForm {
    constructor(forms) {
        
      this.name = forms.Nameoftheform;
      this.formxml=forms.Formxml;
      this.objecttypecode=forms.Entityname;
      this.type = (forms.Formtype === "Main") ? 1 : (forms.Formtype === "Quick create") ? 3 :(forms.Formtype === "Quick view") ? 4:forms.Formtype;
     
    }
   
    
}

module.exports =  CreateForm 
 