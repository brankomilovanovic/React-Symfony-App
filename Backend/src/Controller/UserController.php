<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\HttpFoundation\JsonResponse;

class UserController extends ApiController
{
    private $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    #[Route('/api/users', methods: ['GET'])]
    public function getAll()
    {
        $entits = $this->repository->getAll();

        if($entits){
            return $this->respond($entits);

        }

        return $this->setStatusCode(404)->respondWithMessage('Not exist no one user!');
    }

    #[Route('/api/users/{id}', methods: ['GET'])]
    public function getOne($id)
    {
        $entity = $this->repository->find($id);
        if($entity)
        {
            return $this->respond($this->repository->transform($entity));
        }

        return $this->setStatusCode(404)->respondWithMessage('Not exist entity under that ID!');
    }
    
    #[Route('/api/users', methods: ['POST'])]
    public function create(Request $request)
    {
        $request = $this->transformJsonBody($request);
        $entity = new User();

        $entity->setName($request->get('name'));
        $entity->setSurname($request->get('surname'));
        $entity->setUsername($request->get('username'));
        $entity->setEmail($request->get('email'));
        $entity->setPassword($request->get('password'));
        $entity->setRole('ROLE_USER');
        return $this->respond($this->repository->save($entity, true));
    }

    #[Route('/api/users/{id}', methods: ['POST'])]
    public function update(Request $request, $id)
    {
        $request = $this->transformJsonBody($request);
        $entity = $this->repository->find($id);

        if($entity){
            $entity->setName($request->get('name'));
            $entity->setSurname($request->get('surname'));
            $entity->setUsername($request->get('username'));
            $entity->setEmail($request->get('email'));
            $entity->setPassword($request->get('password'));
            $entity->setRole($request->get('role'));
            return $this->respond($this->repository->save($entity, true));
        }

        return $this->setStatusCode(404)->respondWithMessage('Not exist entity under that ID!');
    }

    #[Route('/api/users/{id}', methods: ['DELETE'])]
    public function delete($id)
    {
        $entity = $this->repository->find($id);

        if($entity){
            $this->repository->remove($entity, true);
            return $this->setStatusCode(200)->respondWithMessage('Deletion successful!');
        }

        return $this->setStatusCode(404)->respondWithMessage('Not exist entity under that ID!');

    }

}
