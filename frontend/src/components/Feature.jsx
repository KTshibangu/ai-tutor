export default function Feature({
    emoji,
    title,
    description,
}) {
    return (

        <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="text-5xl">
                {emoji}
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
                {title}
            </h3>

            <p className="mt-4 text-gray-600">
                {description}
            </p>

        </div>

    );
}