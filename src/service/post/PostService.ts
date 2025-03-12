import { Sequelize } from "sequelize";
import Post from "../../database/postgres/models/postTable";

class PostService {
  constructor() {}

  public async createPost({
    content,
    header,
    imageUrl,
    createdBy,
    t,
  }: {
    content: string;
    header: string;
    imageUrl: string;
    createdBy: number;
    t: any;
  }) {
    await this.create({ content, createdBy, header, imageUrl, t });
    // await this,this.looging
    //extra functions can be called here
  }

  private async create({ content, header, imageUrl, createdBy, t }) {
    return await Post.create(
      {
        content,
        header,
        imageUrl,
        createdBy,
      },
      {
        transaction: t,
      }
    );
  }
  //commenting this part currently out of scope
  //   private async looging({ content, header, imageUrl, createdBy, t }) {
  //     return await Post.create(
  //       {
  //         content,
  //         header,
  //         imageUrl,
  //         createdBy,
  //       },
  //       {
  //         transaction: t,
  //       }
  //     );
  //   }
}

export default PostService;
