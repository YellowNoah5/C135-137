status = ""
objects = []


function preload()
{
    vid = createVideo("video.mp4")
    vid.hide()
    
}

function setup()
{
    canvas = createCanvas(800, 500)
    canvas.position(580, 350)


}

function start()
{
    modl = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("statuss").innerHTML = "Status: Detecting Objects"
}

function modelLoaded()
{
    console.log("Model Loaded!")
    vid.loop()
    vid.volume(0)
    vid.speed(1)
    status = true
}

function draw()
{
    image(vid, 0, 0, 800, 500)

    if(status != "")
    {
        modl.detect(vid, gotResults)
        document.getElementById("statuss").innerHTML = "Status: Objects Detected"
        document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are: "+objects.length

        for(i = 0; i < objects.length; i++)
        {
            percentage = floor(objects[i].confidence*100)

            fill("red")

            textSize(20)

            text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].y)

            noFill()

            stroke("red")

            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }

}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log(results)
        objects = results
    }
}