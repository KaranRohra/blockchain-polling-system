import json
import hashlib
from django.utils import timezone


class Blockchain:
    def __init__(self) -> None:
        self.chain = []

    def create_block(self, block_details):
        if self.validate_chain() == False:
            return False
        block = {
            "index": len(self.chain) + 1,
            "previous_hash": self.get_previous_block_hash(),
            "timestamp": str(timezone.now()),
            **block_details,
        }
        self.chain.append({"block_hash": self.get_block_hash(block), "block": block})
        return True

    def get_previous_block_hash(self):
        return "0" if len(self.chain) == 0 else self.chain[-1]["block_hash"]

    def get_block_hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

    def validate_chain(self):
        for i in range(1, len(self.chain)):
            if (
                self.chain[i]["block"]["previous_hash"] != self.chain[i - 1]["block_hash"] or
                self.chain[i]["block"]["previous_hash"] != self.get_block_hash(self.chain[i-1]["block"])
            ):
                return False  # Means blockchain is not valid and got corrupted

        # If we reach till here it means blockchain is validated successfully
        return True
    
    def get_chain(self):
        return self.chain
    

