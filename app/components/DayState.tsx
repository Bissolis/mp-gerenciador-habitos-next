import Image from "next/image";

export default function DayState({day}: { day: boolean | undefined }){

    let image: [string, string, number?] = ["/markers/marker.svg", "marker", 12]

    if(day == true) image = ["/markers/check.svg", "green marker", 16]
    if(day == false) image = ["/markers/x.svg", "green marker", 18]
    const [src, alt, size] = image

    return(
        <div className="flex items-center justify-center h-9">
            <Image 
            src={src}
            width={size}
            height={size}
            alt={alt}
            />
        </div>
    );
}