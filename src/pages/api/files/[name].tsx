import { getFileByName } from "../../../utils/database";

export const GET = async (request: Request): Promise<Response> => {
    const filename = new URL(request.url).pathname.split("/").pop();
    if (!filename) {
        return Response.json({
            "status": "error",
            "message": "Filename is required"
        }, { "status": 400 });
    }

    const file = await getFileByName(filename);
    if (!file) {
        return Response.json({
            "status": "error",
            "message": "File not found"
        }, { "status": 404 });
    }

    const response = new Response(file.data, {
        "headers": {
            "Content-Type": file.contentType,
            "Content-Length": file.data.length.toString(),
            "Content-Disposition": `attachment; filename="${file.name}"`
        }
    });

    return response;
};
