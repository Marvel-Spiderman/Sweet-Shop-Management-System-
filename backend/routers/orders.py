from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, dependencies
from datetime import datetime

router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)

@router.post("/", response_model=schemas.OrderResponse)
def create_order(
    order: schemas.OrderCreate,
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_user)
):
    # Calculate total amount and verify stock
    total_amount = 0
    db_items = []
    
    for item in order.items:
        product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product.stock < item.quantity:
             raise HTTPException(status_code=400, detail=f"Not enough stock for {product.name}")
        
        # Deduct stock
        product.stock -= item.quantity
        total_amount += product.price * item.quantity
        
        db_items.append({
            "product_id": item.product_id,
            "quantity": item.quantity,
            "price_at_purchase": product.price
        })

    new_order = models.Order(
        user_id=current_user.id,
        total_amount=total_amount,
        status="pending",
        created_at=datetime.utcnow().isoformat()
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item_data in db_items:
        db_item = models.OrderItem(order_id=new_order.id, **item_data)
        db.add(db_item)
    
    db.commit()
    db.refresh(new_order)
    return new_order

@router.get("/", response_model=List[schemas.OrderResponse])
def read_orders(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_user)
):
    orders = db.query(models.Order).filter(models.Order.user_id == current_user.id)\
               .offset(skip).limit(limit).all()
    return orders
