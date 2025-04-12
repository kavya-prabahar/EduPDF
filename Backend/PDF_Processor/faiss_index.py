from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

def create_faiss_index(chunks):
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    faiss_db = FAISS.from_texts(texts=chunks, embedding=embeddings)
    return faiss_db

def search_faiss_index(faiss_db, query, k=10):
    results = faiss_db.similarity_search(query, k = k)
    return results
