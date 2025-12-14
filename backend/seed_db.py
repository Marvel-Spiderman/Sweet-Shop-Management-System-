from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

# Create tables
models.Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()
    
    # Check if products exist
    if db.query(models.Product).count() > 0:
        print("Products already seeded.")
        return

    sweets = [
        {
            "name": "Gulab Jamun",
            "description": "Soft, spongy milk-solid balls soaked in rose-scented sugar syrup.",
            "price": 250.0,
            "category": "Syrup Sweets",
            "image_url": "https://images.unsplash.com/photo-1596541223844-3c870e28c4cc?auto=format&fit=crop&w=500&q=60",
            "stock": 50,
            "is_available": True
        },
        {
            "name": "Kaju Katli",
            "description": "Classic diamond-shaped cashew fudge topped with edible silver foil.",
            "price": 800.0,
            "category": "Burfi",
            "image_url": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60",
            "stock": 40,
            "is_available": True
        },
        {
            "name": "Motichoor Ladoo",
            "description": "Melt-in-the-mouth ladoos made from tiny gram flour pearls.",
            "price": 300.0,
            "category": "Ladoo",
            "image_url": "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=500&q=60",
            "stock": 60,
            "is_available": True
        },
        {
            "name": "Rasgulla",
            "description": "Spongy cottage cheese balls cooked in light sugar syrup.",
            "price": 200.0,
            "category": "Syrup Sweets",
            "image_url": "https://images.unsplash.com/photo-1589948197771-46487e91542f?auto=format&fit=crop&w=500&q=60",
            "stock": 30,
            "is_available": True
        },
        {
            "name": "Jalebi",
            "description": "Crispy, spiral-shaped deep-fried batter soaked in saffron syrup.",
            "price": 150.0,
            "category": "Fried Sweets",
            "image_url": "https://images.unsplash.com/photo-1598516093188-75c6020bf6a3?auto=format&fit=crop&w=500&q=60",
            "stock": 45,
            "is_available": True
        },
        {
            "name": "Mysore Pak",
            "description": "Rich and buttery fudge made from gram flour and ghee.",
            "price": 400.0,
            "category": "Ghee Sweets",
            "image_url": "https://images.unsplash.com/photo-1616031268499-281b67277743?auto=format&fit=crop&w=500&q=60",
            "stock": 25,
            "is_available": True
        }
    ]

    for sweet in sweets:
        db_product = models.Product(**sweet)
        db.add(db_product)
    
    db.commit()
    print("Seeded database with Indian Sweets.")
    db.close()

if __name__ == "__main__":
    seed_db()
