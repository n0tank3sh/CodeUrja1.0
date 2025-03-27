pub mod cases;
pub mod documents;

pub fn config(config: &mut ntex::web::ServiceConfig) { 
    cases::config(config);
}

