from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas, dependencies

router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)

@router.get("/stats")
def get_stats(
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_admin)
):
    total_revenue = db.query(func.sum(models.Order.total_amount)).scalar() or 0
    total_orders = db.query(models.Order).count()
    total_products = db.query(models.Product).count()
    low_stock_products = db.query(models.Product).filter(models.Product.stock < 10).count()
    
    # Simple top selling (by quantity) - logic can be refined
    # For MVP, just returning basic stats
    return {
        "total_revenue": total_revenue,
        "total_orders": total_orders,
        "total_products": total_products,
        "low_stock_products": low_stock_products
    }
