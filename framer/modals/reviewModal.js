import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Backdrop } from '../backdrop';
import { useReviewModalStore } from '@/useReviewModalStore';
import { useRateItemMutation } from '@/app/api/reviewItem';
import { useModalStore } from '@/store/useModalStore';
import { useSubmitStore } from '@/store/useSubmitStore';
import { useStatusStore } from '@/store/useStatusStore';
export const ReviewModal = () => {
  const { formData, closeForm } = useReviewModalStore();
  const { closeModal } = useModalStore()
  const { mutate: RateItem } = useRateItemMutation()
  const [rating, setRating ] = useState(0)
  const [comment, setComment ] = useState('')
  const { submitting, setSubmitting } = useSubmitStore()
  const { success, setSuccess, error, setError } = useStatusStore()
  const emojis = ["😡", "😕", "😐", "😊", "😍"];

  if (!formData || !formData.item) return null;

  const { item, id } = formData; //formData is for ReviewModalData
  const handleEmojiClick = (index) => {
      setRating(index + 1);
  }
  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const addReview = () => {
    setSuccess("")
    setError("")
    setSubmitting(true)

    RateItem(
      {
        order_item: item.order_item_id,
        rating,
        comment,
        order: id
      },{
      onSuccess: () => {
        console.log("it works!");
        // setSuccess("Review Submitted")
        closeModal()
        closeForm()

      },
      onError: (err) => {
        setError("Couldn't upload review... ");
      }
    }
    );
      setSubmitting(false)
  };
  return (
    <Backdrop onClick={closeForm}>
        
    <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing modal
        className="review-modal bg-white p-4 md:px-20 rounded shadow-lg flex flex-col"
   
        >
        <h1 className="text-lg mb-4 font-bold">Rate Item: {item.order_item}</h1>
        
        <div className="flex gap-2 md:gap-4 mt-4 justify-center">
            {emojis.map((emoji, index) => (
            <motion.div
                key={index}
                onClick={() => handleEmojiClick(index)}
                className={`bg-accent_low text-[25px] md:text-[35px] w-[50px] h-[50px]
                flex justify-center items-center rounded-full cursor-pointer transition-transform duration-300 ease-in-out 
                `}
                whileHover={{ scale: 1.25 }}
                transition={{duration: 0.2}}
            >
                {emoji}
            </motion.div>
            ))}
        </div>

        {rating !== null && (
          <p className="mt-4 text-lg font-semibold text-center">
            {rating} {emojis[rating - 1]}
          </p> 
        )}

        <div className='flex flex-col'>
            <label>Leave a comment (optional) </label>
            <textarea onChange={handleComment} className='focus:outline-none border-2 border-primary p-1'></textarea>
        </div>
        
        <button
          onClick={addReview}
          className="mt-4 bg-primary text-white p-2 rounded w-full hover:bg-primary_dark transition-colors duration-300"
        >
          Submit Review
        </button>
        {/* {success && (
          <p>{success}</p>
        )} */}
        {error && (
          <p className='text-danger'>{error}</p>
        )}

    </motion.div>
    </Backdrop>
  )
}
