import conf from "../conf/conf"
import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Service {
    client = new Client()
    databases
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    staus,
                    userId,
                }
            )
        } catch (error) {
            console.log(
                "Appwrite Service :: Database :: createPost :: error",
                error
            )
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch {
            console.log(
                "Appwrite Service :: Database :: updatePost :: error",
                error
            )
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log(
                "Appwrite service :: Database :: deletePost :: error",
                error
            )
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(
                "Appwrite service :: Database :: getPost :: error",
                error
            )
        }
    }

    // queries = [Query.equal("status", "active")] ==> filter query
    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId
                // queries ==> if query is passed
            )
        } catch (error) {
            console.log(
                "Appwrite service :: Database :: listPost :: error",
                error
            )
            return false
        }
    }

    //file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(
                "Appwrite Service :: Storage :: uploadFile :: error",
                error
            )
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
            return true
        } catch (error) {
            console.log(
                "Appwrite Service :: Storage :: delteFile :: error",
                error
            )
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
        } catch (error) {
            console.log(
                "Appwrite Service :: Storage :: getFilePreview :: error",
                error
            )
            return true
        }
    }
}

const service = new Service()
export default service
