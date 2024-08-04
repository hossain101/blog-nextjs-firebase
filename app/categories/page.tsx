
import CategoryCardLarge from '@/components/Category/CategoryCardLarge'
import { getAllCategories } from '@/lib/firebase/category/read_server'
import React from 'react'

const page =  async () => {
    const categories = await getAllCategories()
  return (
    <main className='p-10'>
        <section className='flex'>

        {
            categories.map((category: Record<string, string>) => (
                <div className=' grid grid-cols-4 gap-5 border' key={category.id}>
                    <CategoryCardLarge category={category} />
                    
                </div>
            ))
        }
        </section>
    </main>
  )
}

export default page