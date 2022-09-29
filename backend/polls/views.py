from random import randint
from rest_framework.views import APIView
from rest_framework.response import Response

from polls.blockchain import Blockchain

created_poll_blockchain = Blockchain()
poll_by_blockchain = Blockchain()


class PollAPI(APIView):
    def post(self, request, *args, **kwargs):
        for poll_detail in request.data["polls"]:
            is_created = created_poll_blockchain.create_block(
                block_details={
                    "poll_details": {
                        "user_id": poll_detail["user_id"],
                        "poll_question": poll_detail["poll_question"],
                        "poll_options": poll_detail["poll_options"],
                    }
                }
            )
            if not is_created:
                return Response({"message": "Blockchain is corrupted"})
        return Response({"message": "Poll created successfully"})

    def get(self, request, *args, **kwargs):
        poll_id = kwargs.get("poll_id")
        if poll_id is not None:
            if len(created_poll_blockchain.chain) < poll_id or poll_id <= 0:
                return Response({"message": "Invalid poll_id"})
            return Response(created_poll_blockchain.chain[poll_id - 1])
        return Response(created_poll_blockchain.chain)


class PollByUserAPI(APIView):
    def post(self, request, *args, **kwargs):
        poll_by, poll_id, poll_option_id = (
            request.data["user_id"],
            request.data["poll_id"],
            request.data["poll_option_id"],
        )
        if len(created_poll_blockchain.chain) < poll_id or poll_id <= 0:
            return Response({"message": "Invalid poll_id"})
        if (
            len(
                created_poll_blockchain.chain[poll_id]["block"]["poll_details"][
                    "poll_options"
                ]
            )
            < poll_option_id
            or poll_option_id <= 0
        ):
            return Response({"message": "Invalid poll_option_id"})

        is_created = poll_by_blockchain.create_block(
            block_details={
                "poll_details": {
                    "poll_by": poll_by,
                    "poll_id": poll_id,
                    "poll_option_id": poll_option_id,
                }
            }
        )
        if is_created:
            return Response({"message": "Polled successfully"})
        return Response({"message": "Blockchain is corrupted"})

    def get(self, request, *args, **kwargs):
        poll_id = kwargs["poll_id"]
        if len(created_poll_blockchain.chain) < poll_id or poll_id <= 0:
            return Response({"message": "Invalid poll_id"})

        poll_results = [0] * len(
            created_poll_blockchain.chain[poll_id - 1]["block"]["poll_details"][
                "poll_options"
            ]
        )

        for block in poll_by_blockchain.chain:
            poll_details = block["block"]["poll_details"]
            if poll_details["poll_id"] == poll_id:
                poll_results[poll_details["poll_option_id"] - 1] += 1

        total = sum(poll_results)
        for i in range(len(poll_results)):
            poll_results[i] = round(poll_results[i] * 100 / total, 2)

        return Response(poll_results)


class CorrupBlockchainAPI(APIView):
    def get(self, request, *args, **kwargs):
        block = created_poll_blockchain.chain[
            randint(0, len(created_poll_blockchain.chain) - 1)
        ]
        block["block"]["poll_details"]["user_id"] = "123@gmail.com"
        return Response({"message": "Corrupted successfully"})
