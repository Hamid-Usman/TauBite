"use client"
import { CreateProduct } from '@/app/api/createProduct'
import { Backdrop } from '@/framer/backdrop'
import { useFoodsStore } from '@/store/useFoodsStore'
import { useModalStore } from '@/store/useModalStore'
import { useProductCreateStore } from '@/store/useProductCreateStord'
import { useTags } from '@/app/api/getTags'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { productSchema } from '@/schemas/productSchema'

function Page() {
    const {form, setForm} = useProductCreateStore()
    const { isOpen, openModal, closeModal } = useModalStore()
    const { data: tags = [], isLoading, isError: isTagError } = useTags();
    const { register, handleSubmit, setValue, formState: {errors} } = useForm({
        resolver: yupResolver(productSchema)
    })

    const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description || "");
        formData.append("price", values.price.toString());
        values.tags.forEach(tag => formData.append("tags", tag));

        if (form.image) {
            formData.append("image", form.image); // ✅ use Zustand value directly
        } else {
            console.warn("No image provided!");
        }

        try {
            await CreateProduct(formData);
            openModal();
        } catch (err) {
            console.error("Error submitting product:", err);
        }
    };
    
        
    const handleTagChange = (tag) => {
        const selectedTags = form.tags.includes(tag)
        ? form.tags.filter((t) => t !== tag)
        : [...form.tags, tag];

        setForm("tags", selectedTags);
        setValue("tags", selectedTags, { shouldValidate: true })
    };
    return (
        <div className='flex items-center sm:p-3 flex flex-col gap-3'>
            <div className='w-full sm:w-[600px] h-screen bg-gray_back rounded-lg p-5 flex flex-col gap-2 sm:h-fit'>
                <div>
                    <h3 className='text-primary text-2xl font-bold'>Add Product </h3>
                    <p className="text-gray">Add a food/drink to the menu</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-3 flex flex-col gap-3 rounded-lg'>
                    <div>
                        <label className='font-bold' >Title</label>
                        <input {...register("name")} value={form.name} onChange={(e) => setForm('name',  e.target.value)} className='border-2 border-gray w-full p-1 rounded-md focus:outline-none focus:border-primary'/>
                    </div>
                        <p className="text-start text-red-500">{errors.name?.message}</p>
                    <div className='flex flex-col'>
                        <label className='font-bold'>Description</label>
                        <textarea 
                            {...register("description")}
                            value={form.description} 
                            onChange={(e) => setForm('description', e.target.value)}
                            className='p-2 border-2 border-gray rounded-md focus:outline-none focus:border-primary'
                        />
                    </div>
                    {isLoading ? (
                    <p>Loading tags...</p>
                    ) : (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <label key={tag.id} className="flex items-center gap-1 text-sm">
                            <input
                                type="checkbox"
                                checked={form.tags.includes(tag.tag)}
                                onChange={() => handleTagChange(tag.tag)}
                            />
                            {tag.tag}
                            </label>
                        ))}
                        
                        <p className="text-start text-red-500">{errors.tags?.message}</p>
                    </div>
                    )}
                    <div className='flex flex-col'>
                        <label className='font-bold'>Image</label>
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={e => {
                                const file = e.target.files?.[0] || null;
                                setForm("image", file); // Store in Zustand
                                setValue("image", file, { shouldValidate: true }); // RHF validation
                            }}
                            className='border-2 border-gray p-1 rounded-md focus:outline-none focus:border-primary'
                        />
                        {form.image && (
                            <p className="text-sm text-gray-600">Selected: {form.image.name}</p>
                        )}
                        <p className="text-start text-red-500">{errors.image?.message}</p>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>Price</label>
                        <input
                            {...register("price")}
                            value={form.price} 
                            onChange={(e) => setForm('price', e.target.value)}
                            type="number" className='w-fit border-2 border-gray p-1 rounded-md focus:outline-none focus:border-primary'/>
                        <p className="text-start text-red-500">{errors.price?.message}</p>
                    </div>
                    <button type='submit' className="bg-primary hover:bg-primary-fade py-2 px-8 hover:bg-gradient hover:px-6 text-white rounded-sm transition-all duration-500">Create Item</button>

                </form>
            </div>
            {isOpen && (
                <Backdrop onClick={closeModal}>
                    <div className='p-3 px-5 bg-white flex flex-col gap-3 rounded-xl'>
                        <h3 className='text-2xl font-semibold'>Product added successfully</h3>
                        <p>Don&lsquo;t worry, the description is being worked on in the background...</p>
                    </div>
                </Backdrop>
            )}
        </div>
    )
}

export default Page