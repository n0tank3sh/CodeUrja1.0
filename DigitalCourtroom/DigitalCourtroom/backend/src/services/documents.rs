//use std::io::Read;
//
//use crate::AppState;
//use minio::s3::args::{CreateMultipartUploadArgs, UploadPartArgs};
//use ntex::util::BytesMut;
//use object_store::{client::HttpResponse, multipart::MultipartStore, path, ObjectStore, PutPayload, WriteMultipart};
//use serde::{Deserialize, Serialize};
//use time::UtcDateTime;
//
//#[derive(Serialize, Deserialize)]
//struct Document { 
//    title: String,
//    created_at: String
//}
//
//#[derive(sqlx::FromRow, serde::Serialize, serde::Deserialize)]
//struct DocumentRow { 
//    key: String,
//    title: String,
//    url: String,
//    created_at: String
//}
//
//#[ntex::web::get("/documents")]
//async fn get_documents(state: ntex::web::types::State<AppState>) -> impl ntex::web::Responder { 
//    let pool = state.pool.clone();
//    let document_r = sqlx::query_as!(DocumentRow, "SELECT * FROM \"documents\";").fetch_all(&pool).await;
//    match document_r { 
//        Ok(document) => { 
//            ntex::web::HttpResponse::Ok().json(&document)
//        }
//        Err(_) => {
//            ntex::web::HttpResponse::NotFound().body("not found")
//        }
//    }
//}
//
//#[derive(Serialize, Deserialize)]
//struct DocumentQuery{ 
//    name: String,
//    size: u32
//}
//
//const MAX_SIZE: usize = 262_144;
//
//#[ntex::web::post("/document")]
//async fn post_document(state: ntex::web::types::State<AppState>, mut payload: ntex::web::types::Payload, query: ntex::web::types::Query<DocumentQuery>) -> impl ntex::web::Responder { 
//    let mut body = BytesMut::new();
//    let path = object_store::path::Path::from(format!("documents/{}", query.name));
//    let multipart_id = state.client.create_multipart(&path).await;
//    if let Err(_) = multipart_id { 
//        return ntex::web::HttpResponse::InternalServerError().finish();
//    }
//    while let Some(chunk) = ntex::util::stream_recv(&mut payload).await { 
//        let upload = state.client.put_multipart(&path).await.unwrap();
//        let mut write = WriteMultipart::new(upload);
//        write.put(chunk.unwrap().to_vec().into());
//    }
//    let query = query.into_inner();
//    let _ = sqlx::query!("INSERT INTO documents (title, created_at) 
//        VALUES ($1, $2)", query.name,  UtcDateTime::now().to_string()).execute(&state.pool).await;
//    ntex::web::HttpResponse::Accepted().finish()
//}
//
//#[ntex::web::delete("/document")]
//async fn delete_document(state: ntex::web::types::State<AppState>, query: ntex::web::types::Query<DocumentQuery>) -> impl ntex::web::Responder { 
//    let path = object_store::path::Path::from(format!("documents/{}", query.name));
//    let _ = state.client.delete(&path);
//    ntex::web::HttpResponse::Ok().finish()
//}
