export const cursos = {
  "type": "object",
  "title": "Cursos",
  "domain": "cursos",
  "properties": [
    {
      "component": "Tabs",
      "tabs": [
        {
          "name": ".tabCurso",
          "label": "Course",
          "enabledStyle": "display: flex"
        },
        {
          "name": ".tabVideos",
          "label": "Videos"
        },  
        {
          "name": ".tabCategories",
          "label": "Categories"
        }
      ]
    },
    {
      "component": "div",
      "class": "d-flex tabCurso",
      "children": [
        {
          "name": "id",
          "label": "ID",
          "config": {
            "grid": true,
            "sort": 2
          }
        },
        {
          "name": "cover",
          "label": "Capa",
          "type": "image",
          "schema":{
            "api":{ 
              "rootApi": "https://bwq0clo39d.execute-api.us-east-1.amazonaws.com/dev/filemanager",
              "wrapData": "src",
              "headers":{
                "Authorization": "Bearer 123456789",
                "app-key": "coursestube",
                "Content-Type": "multipart/form-data"
              }
            }
          },
          "validation": "mime:image/*", 
          "config": {
            "grid": true,
            "sort": 1,
            "type": "image"
          }
        }
      ]
    },
    {
      "component": "div",
      "class": "d-flex tabCurso",
      "children": [
        {
          "name": "title",
          "label": "Title",
          "config": {
            "grid": true
          }
        },
        {
          "name": "tags",
          "label": "Tags",
          "config": {
            "grid": true
          }
        }
      ]
    },
    {
      "component": "div",
      "class": "d-flex tabCurso",
      "children": [
        {
          "name": "url",
          "label": "URL"
        },
        {
          "name": "channel",
          "label": "Channel"
        },
        {
          "name": "channel_url",
          "label": "Channel Url"
        }
      ]
    },
    {
      "component": "div",
      "class": "d-flex tabCurso",
      "children":[
        {
          "name": "lang",
          "label": "Language",
          "type": "select",
          "options": [
            { "value": "EN", "label": "English" },
            { "value": "PT", "label": "Português" },
            { "value": "ES", "label": "Spanish" }
          ],
          "config": {
            "grid": true,
            "sort": 3
          }
        },
        {
          "name": "level",
          "label": "Level",
          "type": "select",
          "default": 1,
          "options": [
            { "value": 1, "label": "Beginner" },
            { "value": 2, "label": "Intermediate" },
            { "value": 3, "label": "Advanced" }
          ],
          "config": {
            "grid": true,
            "sort": 6
          }
        },
        {
          "name": "source",
          "label": "Source",
          "type": "select", 
          "options": [
            { "value": "playlist", "label": "Playlist" }, 
            { "value": "video", "label": "Video chapters" }
          ],
          "config": {
            "grid": true,
            "sort": 8
          }
        }
      ]
    },
    {
      "name": "description",
      "wrapper-class": ["w-100"],  
      "outer-class": ["tabCurso"],
      "label": "Desc",
      "type": "textarea"
    }, 
    {
      "name": "metadata",
      "wrapper-class": ["w-100"],  
      "outer-class": ["tabCurso"],
      "label": "Meta data",
      "type": "json"
    },
    {
      "component": "div",
      "class": "d-flex tabCurso",
      "children": [
        {
          "name": "created_at",
          "label": "Created",
          "type": "date",
          "readonly": true,
          "ignored": true,
          "config": {
            "grid": true,
            "sort": 12, 
            "type": "date",
            "action": {
              "format": "D/M/YY \\a\\s hh:mm"
            }
          }
        },
        {
          "name": "updated_at",
          "label": "Updated",
          "type": "date",
          "readonly": true,
          "ignored": true, 
          "type": "datetime-local"
        }
      ]
    },
    {
      "name": "videos",
      "label": "Videos",
      "outer-class": ["tabVideos"],
      "type": "grid",
      "schema": {
        "title": "Videos",
        "api": {
          "bypassGetData": true,
          "bypassGetById": true,
          "rootApi": "https://express-multidatabase-vercel.vercel.app/api/admin/CoursesVideos?filter=course_id,eq,{course_id}",
          "params": { "limit": 5 },
          "pagination": {
            "pageField": "page",
            "limitField": "limit"
          }
        },
        "properties": [
          {
            "name": "id",
            "label": "Id",
            "config": { "grid": true }
          },
          {
            "name": "title",
            "label": "Title",
            "config": { "grid": true }
          },
          {
            "name": "url",
            "label": "URL",
            "config": { "grid": true }
          }
        ]
      }
    },
    {
      "name": "chapters",
      "label": "Chapters",
      "outer-class": ["tabVideos"],
      "type": "grid",
      "schema": {
        "title": "Chapters",
        "api": {
          "bypassGetData": true,
          "bypassGetById": true,
          "rootApi": "https://express-multidatabase-vercel.vercel.app/api/admin/Chapters?filter=course_id,eq,{course_id}",
          "params": { "limit": 5 },
          "pagination": {
            "pageField": "page",
            "limitField": "limit"
          }
        },
        "properties": [
          {
            "name": "id",
            "label": "Id",
            "config": { "grid": true }
          },
          {
            "name": "title",
            "label": "Title",
            "config": { "grid": true }
          },
          {
            "name": "time",
            "label": "Time",
            "config": { "grid": true }
          }
        ]
      }
    },
    {
      "name": "categories",
      "outer-class": ["tabCategories"],  
      "type": "grid",  
      "schema":{
        "title": "Categories",
        "api": {
          "bypassGetData": true,
          "bypassGetById": true,
          "rootApi": "https://express-multidatabase-vercel.vercel.app/api/admin/CoursesCategory?filter=course_id,eq,{id}", 
          "pagination": {
            "pageField": "page",
            "limitField": "limit"
          }
        },
        "properties": [
            {
              "name": "id",
              "label": "Id", 
              "config": { "grid": true }
            },   
            {
              "name": "category_id",
              "label": "Category", 
              "type": "select", 
              "config": { "grid": true },
              "remote": true,
              "attributes": {
                "fieldLabel": "name",
                "fieldValue": "id"
              },
              "schema": {  
                "domain": "categories",
                "properties": [
                      {
                        "name": "id",
                        "label": "ID"
                      },
                      {
                        "name": "name",
                        "label": "Name"
                      }
                ],
                "api": {
                  "rootApi": "https://express-multidatabase-vercel.vercel.app/api/admin/CoursesCategories"
                } 
              }
            },
            {
              "name": "category",
              "label": "Category",
              "type": "select", 
              "config": { "grid": true },
              "remote": true,
              "attributes": {
                "fieldLabel": "name",
                "fieldValue": "name"
              },
              "schema": {  
                "domain": "categories",
                "properties": [
                      {
                        "name": "id",
                        "label": "ID"
                      },
                      {
                        "name": "name",
                        "label": "Name"
                      }
                ],
                "api": {
                  "rootApi": "https://express-multidatabase-vercel.vercel.app/api/admin/CoursesCategories"
                } 
              }
            },
            {
              "name": "course_id",
              "label": "Course ID"
            }
        ]
      },
      "config": {
        "grid": true,
        "type": "expression",
        "action": {
          "template": "{data[0].category}"
        }
      }
    }
  ],
  "api": {
    "baseUrl": "https://coursestube.com/api/courses",
    "wrapData": "rows",
    "totalData": "count",
    "pagination": {
      "pageField": "page",
      "limitField": "limit",
      "sortField": "sort",
      "sortExp": "{sort}{prop}",
      "sortAscChar": "",
      "sortDescChar": "-",
      "filterField": "filter",
      "filterExp": "{prop},like,%{value}%"
    },
    "params": {
      "limit": 5,
      "sort": "-id"
    }
  }
}