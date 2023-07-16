<?php
namespace App\Handler;

use Doctrine\ORM\EntityRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Psr\Container\ContainerInterface;

class BaseHandler
{
    protected $repository;
    protected $container;

    public function __construct(EntityRepository $repository, ContainerInterface $container)
    {
        $this->repository = $repository;
        $this->container = $container;
    }

    protected function response($data = [], $statusCode = 200, $headers = [])
    {
        return new JsonResponse($data, $statusCode, $headers);
    }

    protected function responseWithMessage($message = '', $statusCode = 200, $headers = [])
    {
        $data = [
            'message' => $message,
        ];

        return new JsonResponse($data, $statusCode, $headers);
    }

    protected function parameterMissingResponse()
    {
        return $this->responseWithMessage('Parameters missing', 400);
    }

    public function getAll()
    {
        $entities = $this->repository->getAll();

        if (!empty($entities)) {
            return $this->response($entities);
        }

        return $this->responseWithMessage('', 204);
    }

    public function get($id)
    {
        $entity = $this->repository->get($id);

        if(!empty($entity)) {
            return $this->response($entity);
        }

        return $this->responseWithMessage('', 204);
    }
}