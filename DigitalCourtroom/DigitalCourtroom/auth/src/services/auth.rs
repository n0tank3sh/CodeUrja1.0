use ntex::web;

#[web::post("/register")]
async fn register_user() -> impl web::Responder { 
    web::HttpResponse::Accepted().body("user has been registered")
}
