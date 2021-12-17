function GalleryItem({photo}) {
    return (
        <div className="max-h-24 max-w-24 cursor-pointer">
            <img src={photo} alt="" className="object-cover w-full h-full rounded-lg hover:opacity-70" />
        </div>
    )
}

export default GalleryItem
