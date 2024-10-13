const express = require('express');
const axios = require('axios');
const EntityMetadata = require('./Entity/CreateEntityMetdata');
const bodyParser = require('body-parser');
const CreateEntityMetdata = require('./Entity/CreateEntityMetdata');
const UpdateEntityMetdata = require('./Entity/UpdateEntityMetdata');
const createAttribute = require('./Attributes/CreateAttribute');
const UpdateAttribute = require('./Attributes/UpdateAttribute');
const CreateViews= require('./Views/CreateViews');
const UpdateView = require('./Views/UpdateView');
const CreateForm = require('./Forms/CreateForms');
const UpdateForm = require('./Forms/UpdateForm');
const AddComponenet = require('./Componenet/AddComponenet');
const CreateLookup = require('./Relationship/CreateLookup');
const CreateCustomerLookup = require('./Relationship/CreateCustomerLookup');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const fetchEntityMetadata = async (tokenData) => {
    const url = `${process.env.YOUR_ORG}/EntityDefinitions`; // Ensure resource is set in .env
    const selectFields = 'MetadataId,LogicalName,DisplayName';

    try {
        const response = await axios.get(url, {
            params: {
                $select: selectFields
            },
            headers: {
                'Authorization': `Bearer ${tokenData}`, // OAuth 2.0 token
                'OData-MaxVersion': '4.0',
                'OData-Version': '4.0',
                'Accept': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching entity metadata:', error.response ? error.response.data : error.message);
        throw error;
    }
};

app.use(bodyParser.json());

// Log environment variables for debugging
console.log('Tenant ID:', process.env.TENANT_ID);
console.log('Client ID:', process.env.CLIENT_ID);
const url = `${process.env.YOUR_RESOURCE}/EntityDefinitions`;
console.log('Fetching from URL:', url);

// app.post('/api/getcrmtoken', async (req, res) => {
//     const { TENANT_ID, CLIENT_ID, CLIENT_SECRET, YOUR_RESOURCE } = process.env;

//     if (!TENANT_ID || !CLIENT_ID || !CLIENT_SECRET) {
//         return res.status(400).json({ error: 'Missing required environment variables.' });
//     }

//     const params = new URLSearchParams();
//     params.append('grant_type', 'client_credentials');
//     params.append('client_id', CLIENT_ID);
//     params.append('client_secret', CLIENT_SECRET);
//     params.append('resource', YOUR_RESOURCE);

//     try {
//         const response = await axios.post(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/token`, params);
//         res.json(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching the token.' });
//     }
// });
app.post('/api/getattributes', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
     const entityLogicalName = req.body.LogicalName;
     if (!entityLogicalName) {
        return res.status(400).json({
            message: 'LogicalName is required in the request body'
        });
    }
    const apiUrl = `${url}EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes`;
    console.log(apiUrl);
    try {
        // Make the GET request to the Dynamics 365 API
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`, // Include the bearer token
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Send the response data back to the client
        res.status(200).json({
            message: 'Attributes retrieved successfully',
            data: response.data
        });
    } catch (error) {
        console.error('Error retrieving attributes:', {
            message: error.message,
            response: error.response ? error.response.data : null
        });

        res.status(error.response ? error.response.status : 500).json({
            message: 'Error retrieving attributes',
            error: error.response ? error.response.data : error.message
        });
    }
});
app.post('/api/getallsystemviews', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
     const entityLogicalName = req.body.LogicalName;
     if (!entityLogicalName) {
        return res.status(400).json({
            message: 'LogicalName is required in the request body'
        });
    }
    const apiUrl = `${url}savedqueries?$filter=returnedtypecode eq '${entityLogicalName}'`;
    //https://ogre-dev.crm11.dynamics.com/api/data/v9.0/savedqueries?$filter=returnedtypecode eq 'account'
    try {
        // Make the GET request to the Dynamics 365 API
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`, // Include the bearer token
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Send the response data back to the client
        res.status(200).json({
            message: 'views retrieved successfully',
            data: response.data
        });
    } catch (error) {
        console.error('Error retrieving views:', {
            message: error.message,
            response: error.response ? error.response.data : null
        });

        res.status(error.response ? error.response.status : 500).json({
            message: 'Error retrieving views',
            error: error.response ? error.response.data : error.message
        });
    }
});
app.post('/api/getallforms', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
    const entityLogicalName = req.body.LogicalName;
    if (!entityLogicalName) {
        return res.status(400).json({
            message: 'LogicalName is required in the request body'
        });
    }
    const apiUrl = `${url}systemforms?$filter=objecttypecode eq '${entityLogicalName}'`;
    console.log(apiUrl);
    try {
        // Make the GET request to the Dynamics 365 API
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`, // Include the bearer token
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Send the response data back to the client
        res.status(200).json({
            message: 'forms retrieved successfully',
            data: response.data
        });
    } catch (error) {
        console.error('Error occured while retrieving  forms:', {
            message: error.message,
            response: error.response ? error.response.data : null
        });

        res.status(error.response ? error.response.status : 500).json({
            message: 'Error occured while retrieving forms',
            error: error.response ? error.response.data : error.message
        });
    }
    
});
app.post('/api/createEntityNew', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;

    // Entity data from request body
   // const entityData = req.body;
    const entityData = new CreateEntityMetdata(req.body);

    console.log(JSON.stringify(entityData, null, 2))
   // console.log(entityData.Attributes.)

    try {
        const response = await axios.post(url+"EntityDefinitions", entityData, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Successful creation response
        res.status(201).json({
            message: 'Entity created successfully',
           // data: response.data
        });
    } catch (error) {
        console.error('Error creating entity:', {
            message: error.message,
            response: error.response ? error.response.data : null,
            config: error.config,  // Log the request configuration for context
            requestData: entityData // Log the mapped entity data
        });

        res.status(error.response ? error.response.status : 500).json({
            message: 'Error creating entity',
            error: error.response ? error.response.data : error.message
        });
    }
});
app.post('/api/createlookupattribute', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
    const LookupData = new CreateLookup(req.body);
    console.log(JSON.stringify(LookupData, null, 2))

    try {
        const response = await axios.post(url+"RelationshipDefinitions", LookupData, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        res.status(201).json({
            message: 'Lookup Attribute created successfully',
           // data: response.data
        });
    } catch (error) {
        console.error('Error in creating Lookup Attribute:', {
            message: error.message,
            response: error.response ? error.response.data : null,
            config: error.config,  // Log the request configuration for context
            requestData: LookupData // Log the mapped entity data
        });
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error in creating Lookup Attribute',
            error: error.response ? error.response.data : error.message
        });
    }
});
app.post('/api/createOnetomany', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
    const LookupData = new CreateCustomerLookup(req.body);
    console.log(JSON.stringify(LookupData, null, 2))

    try {
        const response = await axios.post(url+"CreateCustomerRelationships", LookupData, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        res.status(201).json({
            message: 'Relationship created successfully',
           // data: response.data
        });
    } catch (error) {
        console.error('Error in creating Relationship ', {
            message: error.message,
            response: error.response ? error.response.data : null,
            config: error.config,  
            requestData: LookupData // Log the mapped entity data
        });
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error in creating  Relationship',
            error: error.response ? error.response.data : error.message
        });
    }
});
app.post('/api/AddComponent', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
    const ComponentData = new AddComponenet(req.body);
    console.log(JSON.stringify(ComponentData, null, 2))
    try {
        const response = await axios.post(url+"AddSolutionComponent", ComponentData, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Successful creation response
        res.status(201).json({
            message: 'Component  Added successfully',
           // data: response.data
        });
    } catch (error) {
        console.error('Error in adding Component :', {
            message: error.message,
            response: error.response ? error.response.data : null,
            config: error.config,  // Log the request configuration for context
            requestData: ComponentData // Log the mapped entity data
        });
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error In Adding  Component',
            error: error.response ? error.response.data : error.message
        });
   
    }
});
app.post('/api/updateattribute', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
    const attributedata = new UpdateAttribute(req.body);
    console.log(JSON.stringify(attributedata, null, 2))
    // try {
    //     const response = await axios.post(`${url}`+"systemforms", attributedata, {
    //         headers: {
    //             'Authorization': `bearer ${bearerToken}`,
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     });
    //     res.status(201).json({
    //         message: 'Attribute   updated successfully',
    //     });
    // } catch (error) {
    //     console.error('Error in updating  attribute :', {
    //         message: error.message,
    //         response: error.response ? error.response.data : null,
    //         config: error.config,  
    //         requestData: attributedata 
    //     });
    //     res.status(error.response ? error.response.status : 500).json({
    //         message: 'Error In updating attribute',
    //         error: error.response ? error.response.data : error.message
    //     });
    // }
});
app.post('/api/createforms', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
    const formdata = new CreateForm(req.body);
    console.log(JSON.stringify(formdata, null, 2))
    try {
        const response = await axios.post(`${url}`+"systemforms", formdata, {
            headers: {
                'Authorization': `bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        res.status(201).json({
            message: 'form  Added successfully',
        });
    } catch (error) {
        console.error('Error in adding form :', {
            message: error.message,
            response: error.response ? error.response.data : null,
            config: error.config,  
            requestData: formdata 
        });
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error In Adding  form',
            error: error.response ? error.response.data : error.message
        });
    }
});
app.post('/api/updateform', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
    const formId = req.body.FormId;
    const formdata = new UpdateForm(req.body);
    console.log(JSON.stringify(formdata, null, 2))
    console.log(`${url}systemforms(${formId})`);
    try {
        const response = await axios.patch(`${url}systemforms(${formId})`, formdata, {
            headers: {
                'Authorization': `bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        res.status(201).json({
            message: 'form  updated successfully',
        });
    } catch (error) {
        console.error('Error in updating a  form :', {
            message: error.message,
            response: error.response ? error.response.data : null,
            config: error.config,  
            requestData: formdata 
        });
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error In updating a  form',
            error: error.response ? error.response.data : error.message
        });
    }
});
app.post('/api/createviews', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
    const ViewData = new CreateViews(req.body);
    console.log(JSON.stringify(ViewData, null, 2))
    try {
        const response = await axios.post(`${url}`+"savedqueries", ViewData, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        res.status(201).json({
            message: 'View  Added successfully',
        });
    } catch (error) {
        console.error('Error in adding View :', {
            message: error.message,
            response: error.response ? error.response.data : null,
            config: error.config,  
            requestData: ViewData 
        });
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error In Adding  view',
            error: error.response ? error.response.data : error.message
        });
    }
});
app.post('/api/updateviews', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
    const ViewData = new UpdateView(req.body);
    const savedQueryId= req.body.viewid;
    console.log(JSON.stringify(ViewData, null, 2))
    try {
        const response = await axios.patch(`${url}savedqueries(${savedQueryId})`, ViewData, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        res.status(201).json({
            message: 'View  updated successfully',
        });
    } catch (error) {
        console.error('Error in updating View :', {
            message: error.message,
            response: error.response ? error.response.data : null,
            config: error.config,  
            requestData: ViewData 
        });
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error In updating  view',
            error: error.response ? error.response.data : error.message
        });
    }
});
app.post('/api/UpdateEntitynew', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;

    // Entity data from request body
   // const entityData = req.body;
    const entityData = new UpdateEntityMetdata(req.body);

    console.log(JSON.stringify(entityData, null, 2))

    try {
        const response = await axios.put(`${url}EntityDefinitions(${req.body.id})`, entityData, {
          
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        // Successful creation response
        res.status(201).json({
            message: 'Entity updated successfully',
           // data: response.data
        });
    } catch (error) {
        console.error('Error  in updating  entity:', {
            message: error.message,
            response: error.response ? error.response.data : null,
            config: error.config,  // Log the request configuration for context
            requestData: entityData // Log the mapped entity data
        });

        res.status(error.response ? error.response.status : 500).json({
            message: 'Error in updating entity ',
            error: error.response ? error.response.data : error.message
        });
    }
});
app.post('/api/CreateAttributes', async (req, res) => {
    const url = process.env.DYNAMICS_API;
    const bearerToken = process.env.BEARER_TOKEN;
   
    const Attributedata = new createAttribute(req.body);

    console.log(JSON.stringify(Attributedata, null, 2))
    console.log(`${url}EntityDefinitions(LogicalName=${req.body.EntityLogicalName})`+"/Attributes");

    try {
        const response = await axios.post(`${url}EntityDefinitions(LogicalName='${req.body.EntityLogicalName}')`+"/Attributes", Attributedata, {
          
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        res.status(201).json({
            message: 'Attribute created successfully',
        });
    } catch (error) {
        console.error('Error  in Creating  Attribute:', {
            message: error.message,
            response: error.response ? error.response.data : null,
            config: error.config,  // Log the request configuration for context
            requestData: Attributedata // Log the mapped entity data
        });

        res.status(error.response ? error.response.status : 500).json({
            message: 'Error in Creating Attribute   ',
            error: error.response ? error.response.data : error.message
     
        });
    }
});
app.get('/api/entityMetadata', async (req, res) => {
    // Call to fetch the token before fetching metadata
    try {
        const { TENANT_ID, CLIENT_ID, CLIENT_SECRET, YOUR_RESOURCE } = process.env;

        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', CLIENT_ID);
        params.append('client_secret', CLIENT_SECRET);
        params.append('resource', YOUR_RESOURCE);

        const tokenResponse = await axios.post(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/token`, params);
        const tokenData = tokenResponse.data.access_token;
        console.log('Using token:', tokenData);


        const metadata = await fetchEntityMetadata(tokenData);
        res.json(metadata);
    } catch (error) {
        console.error('Error retrieving entity metadata:', error.message);
        console.error('Error fetching entity metadata:', error.response ? error.response.data : error.message);
       console.error('Error details:', error);
  
        res.status(500).send('Error retrieving entity metadata');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
