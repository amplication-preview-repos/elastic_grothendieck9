/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { Agent } from "./Agent";
import { AgentCountArgs } from "./AgentCountArgs";
import { AgentFindManyArgs } from "./AgentFindManyArgs";
import { AgentFindUniqueArgs } from "./AgentFindUniqueArgs";
import { CreateAgentArgs } from "./CreateAgentArgs";
import { UpdateAgentArgs } from "./UpdateAgentArgs";
import { DeleteAgentArgs } from "./DeleteAgentArgs";
import { AppointmentFindManyArgs } from "../../appointment/base/AppointmentFindManyArgs";
import { Appointment } from "../../appointment/base/Appointment";
import { AgentService } from "../agent.service";
@graphql.Resolver(() => Agent)
export class AgentResolverBase {
  constructor(protected readonly service: AgentService) {}

  async _agentsMeta(
    @graphql.Args() args: AgentCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @graphql.Query(() => [Agent])
  async agents(@graphql.Args() args: AgentFindManyArgs): Promise<Agent[]> {
    return this.service.agents(args);
  }

  @graphql.Query(() => Agent, { nullable: true })
  async agent(
    @graphql.Args() args: AgentFindUniqueArgs
  ): Promise<Agent | null> {
    const result = await this.service.agent(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => Agent)
  async createAgent(@graphql.Args() args: CreateAgentArgs): Promise<Agent> {
    return await this.service.createAgent({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Agent)
  async updateAgent(
    @graphql.Args() args: UpdateAgentArgs
  ): Promise<Agent | null> {
    try {
      return await this.service.updateAgent({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Agent)
  async deleteAgent(
    @graphql.Args() args: DeleteAgentArgs
  ): Promise<Agent | null> {
    try {
      return await this.service.deleteAgent(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [Appointment], { name: "appointments" })
  async findAppointments(
    @graphql.Parent() parent: Agent,
    @graphql.Args() args: AppointmentFindManyArgs
  ): Promise<Appointment[]> {
    const results = await this.service.findAppointments(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }
}
