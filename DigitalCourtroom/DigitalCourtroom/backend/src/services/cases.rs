use serde::Serialize;
use sqlx::types::chrono::{TimeZone, Utc, DateTime};
use time::OffsetDateTime;

use crate::AppState;

#[derive(sqlx::FromRow, serde::Serialize, serde::Deserialize)]
struct Case { 
    title: String,
    type_: String,
    status: String,
    filing_date: String,    
    next_hearing: Option<String>,
    actions: Option<String>,
}

#[derive(sqlx::FromRow, serde::Serialize, serde::Deserialize)]
struct CaseRow { 
    case_number: i32,
    title: String,
    type_: String,
    status: String,
    filing_date: String,    
    next_hearing: Option<String>,
    actions: Option<String>,
    created_at: String
}



#[ntex::web::get("/cases")]
async fn get_cases(state: ntex::web::types::State<AppState>) -> impl ntex::web::Responder { 
    let pool = state.pool.clone();
    let cases_r = sqlx::query_as!(CaseRow, "SELECT * FROM \"cases\";").fetch_all(&pool).await;
    match cases_r { 
        Ok(cases) => { 
            ntex::web::HttpResponse::Ok().json(&cases)
        }
        Err(_) => {
            ntex::web::HttpResponse::NotFound().body("not found")
        }
    }
}

#[ntex::web::post("/case")]
async fn post_case(state: ntex::web::types::State<AppState>, case: ntex::web::types::Json<Case>) -> impl ntex::web::Responder { 
    let case = case.into_inner();
    let _ = sqlx::query!("INSERT INTO cases (title, type_, status, filing_date, next_hearing, actions) 
        VALUES ($1, $2, $3, $4, $5, $6)", case.title, case.type_, case.status, case.filing_date, case.next_hearing, case.actions).execute(&state.pool).await;
    ntex::web::HttpResponse::Accepted()
}

#[derive(Serialize, serde::Deserialize)]
struct NumCases { 
    total_num: i64
}

#[ntex::web::get("/ncases")]
async fn get_num_cases(state: ntex::web::types::State<AppState>) -> impl ntex::web::Responder { 
    let mut total_case = NumCases { 
        total_num: 0
    };
    total_case.total_num = sqlx::query!("SELECT COUNT(*) FROM cases;").fetch_one(&state.pool).await.unwrap().count.unwrap();
    ntex::web::HttpResponse::Ok().json(&total_case)
}

pub fn config(config: &mut ntex::web::ServiceConfig) { 
    config.service(get_cases).service(post_case);
}
