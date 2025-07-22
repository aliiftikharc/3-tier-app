from sqlalchemy import Column, Integer, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class APICall(Base):
    __tablename__ = 'api_calls'
    id = Column(Integer, primary_key=True)
    data = Column(Text)