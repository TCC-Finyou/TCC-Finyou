const prisma = require("../../server/database/prismaClient");

class Tag {
    async getAllTagsFromUser(userId) {
        return await prisma.tag.findMany({
            where: {
                OR: [
                    {
                        tag_global: 1
                    },
                    {
                        user_id: userId
                    }
                ]
            },
            orderBy: {
                nome_tag: "desc"
            }
        });
    }

    async createTag(data) {
        return await prisma.tag.create({
            data
        });
    }

    async deleteTag(tagId) {
        await prisma.tag.delete({
            where: {
                id: tagId
            }
        });
    }

    async updateTag(tagId, data) {
        await prisma.tag.update({
            where: {
                id: tagId,
            },
            data
        })
    }
}

const tagModel = new Tag();

module.exports = tagModel;