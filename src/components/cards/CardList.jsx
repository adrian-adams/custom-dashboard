import React, { useState, useEffect, useRef } from 'react';
import { getCard } from "/services/cardService";
import CardRes from "@/components/cards/CardRes";
import CardAdd from '@/components/cards/CardAdd';
import LoadingModal from '@/components/custom/LoadingModal';
import { Button } from "@/components/ui/button";

import { onSnapshot, collection } from "firebase/firestore";
import { db } from "/services/firebaseConfig";

export const CardList = ({search, userRole}) => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingModal, setLoadingModal] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [loadingMsg, setLoadingMsg] = useState("");
    const [visibleCount, setVisibleCount] = useState(15);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "cards"), (snapshot) => {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCards(docs);
        }); 
        return () => unsub();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 15);
    }

    const prevCountRef = useRef(0);

    useEffect(() => {
        const getCardData = getCard((data) => {
            setCards(data);
            setLoading(false);
        });
        return () => getCardData();
    }, []);

    useEffect(() => {
        if(!loading) {
            const prevCount = prevCountRef.current;
            const currentCount = cards.length;

            if (currentCount < prevCount) {
                setLoadingModal(true); 
                setLoadingStatus("Success");
                setLoadingMsg("Resource deleted!");

                setTimeout(() => {
                    setLoadingModal(false); 
                }, 1500);
            }
            prevCountRef.current = currentCount;
        }
    }, [cards, loading]);

    if (loading) return <div>Loading...</div>;

    const filteredCards = cards.filter((card) =>
        card.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
        )
    );

  return (
    <>
        <div className="cust_grid">
            {
                userRole === "admin" && (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-3xl p-4 border-4 border-gray-500 border-dashed overflow-hidden h-full">
                        <CardAdd />
                        <p className="bg-black py-2 px-4 rounded-2xl font-medium text-2xl">Add Card</p>
                    </div>
                )
            }
            {filteredCards.length > 0 ? (
                filteredCards.slice(0, visibleCount).sort((a,b) => a.title.localeCompare(b.title)).map((card) => (
                <CardRes key={card.id} card={card} userRole={userRole} />
                ))
            ) : (
                <p className="bg-black p-4 text-white col-span-full text-center mt-4">
                <b>No cards found</b>
                </p>
            )}
        </div>

        <div className='flex justify-center mt-4 py-4'>
            {visibleCount < cards.length && (
                <div className='backdrop-blur p-4 rounded-2xl'>
                    <Button onClick={handleLoadMore} className="cust_cardRes_Btn backdrop-blur" type="button">
                        Load More
                    </Button>
                </div>
            )}
        </div>
        
        <LoadingModal open={loadingModal} status={loadingStatus} message={loadingMsg} />
    </>
  )
}

export default CardList;
