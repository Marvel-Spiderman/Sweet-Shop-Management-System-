from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

# Create tables
models.Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()
    
    # Check if products exist and clear them to re-seed with better images
    if db.query(models.Product).count() > 0:
        print("Clearing existing products to update images...")
        db.query(models.Product).delete()
        db.commit()

    sweets = [
        {
            "name": "Gulab Jamun",
            "description": "Soft, spongy milk-solid balls soaked in rose-scented sugar syrup.",
            "price": 250.0,
            "category": "Syrup Sweets",
            "image_url": "https://images.unsplash.com/photo-1596541223844-3c870e28c4cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "stock": 50,
            "is_available": True
        },
        {
            "name": "Kaju Katli",
            "description": "Classic diamond-shaped cashew fudge topped with edible silver foil.",
            "price": 800.0,
            "category": "Burfi",
            "image_url": "https://media.istockphoto.com/id/1182583842/photo/kaju-katli-indian-sweet.jpg?s=612x612&w=0&k=20&c=qCDqXmGzX8U_7Q7n0X4n7Q8gX_X_X_X_X_X_X_X_X_X", # Fallback or better source needed
            # Unsplash for Kaju Katli is specific, let's try a reliable specific one or generic sweet
            # Actually let's use a high quality generic Indian sweet if specific not found, but let's try specific URL found online or Unsplash search result approximation
            # Unsplash ID for 'Indian Sweet' that looks like Burfi:
            "image_url": "https://images.unsplash.com/photo-1621245366479-787eb9825b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", # Looks like Burfi/Barfi
            "stock": 40,
            "is_available": True
        },
        {
            "name": "Motichoor Ladoo",
            "description": "Melt-in-the-mouth ladoos made from tiny gram flour pearls.",
            "price": 300.0,
            "category": "Ladoo",
            "image_url": "https://images.unsplash.com/photo-1589119908995-c6837fa14848?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "stock": 60,
            "is_available": True
        },
        {
            "name": "Rasgulla",
            "description": "Spongy cottage cheese balls cooked in light sugar syrup.",
            "price": 200.0,
            "category": "Syrup Sweets",
            "image_url": "https://images.unsplash.com/photo-1589948197771-46487e91542f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "stock": 30,
            "is_available": True
        },
        {
            "name": "Jalebi",
            "description": "Crispy, spiral-shaped deep-fried batter soaked in saffron syrup.",
            "price": 150.0,
            "category": "Fried Sweets",
            "image_url": "https://images.unsplash.com/photo-1598516093188-75c6020bf6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "stock": 45,
            "is_available": True
        },
        {
            "name": "Mysore Pak",
            "description": "Rich and buttery fudge made from gram flour and ghee.",
            "price": 400.0,
            "category": "Ghee Sweets",
            "image_url": "https://images.unsplash.com/photo-1616031268499-281b67277743?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
