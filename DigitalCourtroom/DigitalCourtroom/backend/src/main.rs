
#[ntex::web::get("/check")]
async fn health_check() -> impl ntex::web::Responder { 
    ntex::web::HttpResponse::Ok().body("Hello world")
}
pub mod services;
use ntex::web::middleware::Logger;
use object_store::aws;
use sqlx_postgres::{PgPool, PgPoolOptions};

struct AppState { 
    pool: PgPool,
    //client: aws::AmazonS3 
}

#[ntex::main]
async fn main() -> std::io::Result<()> { 
    let _ = dotenv::dotenv();
    let db_url = std::env::var("DATABASE_URL");
    let pool  = PgPoolOptions::new().max_connections(5).connect(&db_url.unwrap()).await.unwrap();
    {
        ntex::web::HttpServer::new(move || { 
            //let s3_url = std::env::var("S3_BUCKET").unwrap();
            ntex::web::App::new().wrap(Logger::default()).state(AppState{
                pool: pool.clone(), 
            //    client: aws::AmazonS3Builder::new().with_url(s3_url).build().unwrap() 
            }).configure(services::config).service(health_check)
        }).bind(("127.0.0.1", 8080))?.run().await
    }
}
