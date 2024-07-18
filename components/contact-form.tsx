export default function ContactForm()  {
    return (
        <form className="flex flex-col items-start mt-8 w-full">
            <label htmlFor="name" className="mb-2">Name</label>
            <input type="text" id="name" name="name" className="w-full p-2 mb-4 border border-gray-300 rounded" />

            <label htmlFor="email" className="mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 mb-4 border border-gray-300 rounded" />

            <label htmlFor="message" className="mb-2">Message</label>
            <textarea id="message" name="message" className="w-full p-2 mb-4 border border-gray-300 rounded" />

            <button type="submit" className="bg-background font-bold px-4 py-2 rounded-lg mt-4 text-primary uppercase">
                Submit
            </button>
        </form>
    );
}
