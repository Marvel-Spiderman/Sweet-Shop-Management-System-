from database import SessionLocal, engine, Base
import models
from sqlalchemy import text

# Create session
db = SessionLocal()

try:
    # Delete all users
    num_deleted = db.query(models.User).delete()
    db.commit()
    print(f"Successfully deleted {num_deleted} users.")
    print("All login credentials have been removed.")
except Exception as e:
    print(f"Error deleting users: {e}")
    db.rollback()
finally:
    db.close()
