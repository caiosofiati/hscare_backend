import { EventEmitter } from "events";
import express from "express";

export abstract class ApiRouter extends EventEmitter {
    public abstract applyRoutes(app: express.Application): void;
    
    public abstract active(): boolean;
}