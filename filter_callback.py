
import re

def callback(blob, metadata):
    # Replace the Aiven password in file contents
    if blob.data:
        blob.data = blob.data.replace(b'REMOVED_SECRET', b'<REDACTED_PASSWORD>')
    
    return blob
