use ntex::web;

pub mod services;

#[ntex::main]
async fn main() -> std::io::Result<()> { 
    web::HttpServer::new(|| { 
        web::App::new()
    }).bind(("127.0.0.1", 4556))?.run().await
}
